import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import crypto from 'node:crypto'

describe('US-04: HMAC IP calculation & Anti-Spam', () => {
  const testSecret = 'test_secret_32_bytes_long_random_value_for_testing'

  function calculateIpHmac(ip, secret) {
    return crypto.createHmac('sha256', secret).update(ip).digest('hex')
  }

  it('deve gerar um hash hexadecimal de 64 caracteres para o IP', () => {
    const ip = '189.120.45.67'
    const hmac = calculateIpHmac(ip, testSecret)

    assert.equal(typeof hmac, 'string')
    assert.equal(hmac.length, 64)
    assert.match(hmac, /^[a-f0-9]{64}$/)
  })

  it('deve ser determinístico para o mesmo IP e secret', () => {
    const ip = '201.55.12.3'
    const hmac1 = calculateIpHmac(ip, testSecret)
    const hmac2 = calculateIpHmac(ip, testSecret)

    assert.equal(hmac1, hmac2)
  })

  it('deve gerar hashes distintos para IPs diferentes', () => {
    const ipA = '177.18.20.1'
    const ipB = '177.18.20.2'
    const hmacA = calculateIpHmac(ipA, testSecret)
    const hmacB = calculateIpHmac(ipB, testSecret)

    assert.notEqual(hmacA, hmacB)
  })

  it('nunca deve expor o IP original no hash', () => {
    const ip = '192.168.1.100'
    const hmac = calculateIpHmac(ip, testSecret)

    assert.equal(hmac.includes('192.168.1.100'), false)
  })
})

describe('US-06: Webhook payload slug extraction', () => {
  function extractSlug(body) {
    return body.record?.slug ?? body.old_record?.slug
  }

  it('deve extrair slug de record em evento INSERT/UPDATE', () => {
    const body = {
      type: 'INSERT',
      table: 'eventos',
      record: { id: '1', slug: 'sarau-vila-fundao-2026', publicado: true },
      old_record: null,
    }
    assert.equal(extractSlug(body), 'sarau-vila-fundao-2026')
  })

  it('deve extrair slug de old_record em evento DELETE', () => {
    const body = {
      type: 'DELETE',
      table: 'eventos',
      record: null,
      old_record: { id: '2', slug: 'sarau-jardim-angela-cancelado' },
    }
    assert.equal(extractSlug(body), 'sarau-jardim-angela-cancelado')
  })

  it('deve preferir record sobre old_record em UPDATE que alterou o slug', () => {
    const body = {
      type: 'UPDATE',
      table: 'eventos',
      record: { id: '3', slug: 'sarau-novo-slug' },
      old_record: { id: '3', slug: 'sarau-antigo-slug' },
    }
    assert.equal(extractSlug(body), 'sarau-novo-slug')
  })

  it('deve retornar undefined se nenhum slug estiver presente', () => {
    const body = {
      type: 'UPDATE',
      table: 'eventos',
      record: {},
      old_record: {},
    }
    assert.equal(extractSlug(body), undefined)
  })
})
