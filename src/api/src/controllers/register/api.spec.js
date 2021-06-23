require('mysql2/node_modules/iconv-lite').encodingExists('foo')

const request = require('supertest')
const app = require('../../testEntry')

describe('Register API', () => {
  describe('Invalid body', () => {
    it('should fail without tutor ', async (done) => {
      const { statusCode, body } = await request(app).post('/api/register').send()
      const { message, details } = body

      expect(message).toEqual('Validation Failed')
      expect(details).toEqual([{ tutor: '"tutor" is required' }])
      expect(statusCode).toEqual(400)
      done()
    })

    it('should fail without students ', async (done) => {
      const { statusCode, body } = await request(app).post('/api/register').send({ tutor: 'sampleTutor1@sample.com' })
      const { message, details } = body

      expect(message).toEqual('Validation Failed')
      expect(details).toEqual([{ students: '"students" is required' }])
      expect(statusCode).toEqual(400)
      done()
    })

    it('should fail if students is empty array', async (done) => {
      const { statusCode, body } = await request(app).post('/api/register').send({ tutor: 'sampleTutor1@sample.com', students: [] })
      const { message, details } = body

      expect(message).toEqual('Validation Failed')
      expect(details).toEqual([{ students: '"students" must contain at least 1 items' }])
      expect(statusCode).toEqual(400)
      done()
    })

    it('should fail if tutor is not an email', async (done) => {
      const { statusCode, body } = await request(app).post('/api/register').send({ tutor: 'sampleTutor' })
      const { message, details } = body

      expect(message).toEqual('Validation Failed')
      expect(details).toEqual([{ tutor: '"tutor" must be a valid email' }])
      expect(statusCode).toEqual(400)
      done()
    })

    it('should fail if students are not in email format', async (done) => {
      const { statusCode, body } = await request(app).post('/api/register').send({ tutor: 'sampleTutor@sample.com', students: [ 'sampleStudent' ] })
      const { message, details } = body

      expect(message).toEqual('Validation Failed')
      expect(details).toEqual([{ 0: '"students[0]" must be a valid email' }])
      expect(statusCode).toEqual(400)
      done()
    })
  })

  describe('Valid body', () => {
    it('should fail if students is enrolled again with the same tutor', async (done) => {
      await request(app).post('/api/register')
        .send({
          tutor: 'sampleTutor@sample.com',
          students: [
            'duplicateStudent@sample.com'
          ] 
        })
      const { statusCode, body } = await request(app).post('/api/register')
        .send({
          tutor: 'sampleTutor@sample.com',
          students: [
            'duplicateStudent@sample.com'
          ] 
        })
      const { message, details } = body

      expect(message).toEqual('Duplicate Data')
      expect(details).toEqual([{ 'duplicateStudent@sample.com': 'This email is already enrolled' }])
      expect(statusCode).toEqual(400)
      done()
    })
    
    it('should pass for new tutor and students', async (done) => {
      const { statusCode } = await request(app).post('/api/register')
        .send({
          tutor: 'newTutor@sample.com',
          students: [
            'newStudent@sample.com'
          ] 
        })
      expect(statusCode).toEqual(204)
      done()
    })

    it('should pass for existing tutor and new students', async (done) => {
      const { statusCode } = await request(app).post('/api/register')
        .send({
          tutor: 'sampleTutor@sample.com',
          students: [
            'newStudent1@sample.com'
          ] 
        })
      expect(statusCode).toEqual(204)
      done()
    })

    it('should pass for new tutor and old students', async (done) => {
      const { statusCode } = await request(app).post('/api/register')
        .send({
          tutor: 'newTutor1@sample.com',
          students: [
            'sampleStudent@sample.com'
          ] 
        })
      expect(statusCode).toEqual(204)
      done()
    })
  })
})