require('mysql2/node_modules/iconv-lite').encodingExists('foo')

const request = require('supertest')
const app = require('../../testEntry')

describe('SuspendStudent API', () => {
  describe('Invalid body', () => {
    it('should fail for nonexistent student', async (done) => {
      const { statusCode, body } = await request(app).post('/api/suspend').send({ student: 'nonexistentStudent@sample.com' })
      const { message } = body

      expect(message).toEqual('Resource Not Found')
      expect(statusCode).toEqual(404)
      done()
    })
  })

  describe('Valid body', () => {
    it('should pass for existing student', async (done) => {
      const { statusCode } = await request(app).post('/api/suspend').send({ student: 'sampleStudent@sample.com' })
      expect(statusCode).toEqual(204)
      done()
    })
  })
})