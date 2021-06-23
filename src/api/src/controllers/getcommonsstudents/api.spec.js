require('mysql2/node_modules/iconv-lite').encodingExists('foo')

const request = require('supertest')
const app = require('../../testEntry')

const api = (tutors) => request(app).post(
    `/api/getcommonsstudents${tutors ? `?tutor=${tutors}` : '' }`
  )

describe('GetCommonStudents Api', () => {
  describe('Invalid query', () => {
    it('should fail without tutor ', async (done) => {
      const { statusCode, body } = await request(app).get('/api/getcommonsstudents').send()
      const { message, details } = body

      expect(message).toEqual('Validation Failed')
      expect(details).toEqual([{ tutor: '"tutor" is required' }])
      expect(statusCode).toEqual(400)
      done()
    })

    it('should fail if tutor is not an email ', async (done) => {
      const { statusCode, body } = await request(app).get('/api/getcommonsstudents?tutor=notemail').send()
      const { message, details } = body

      expect(message).toEqual('Validation Failed')
      expect(details).toEqual([{ tutor: '"tutor" must be a valid email' }])
      expect(statusCode).toEqual(400)
      done()
    })
  })

  describe('Valid query', () => {
    const commonTutorStudents = [
      'commonStudent@sample.com',
      'commonStudent1@sample.com',
      'commonStudent2@sample.com'
    ]
    const commonTutorStudents1 = [
      'commonStudent@sample.com',
      'commonStudent1@sample.com'
    ]
    
    it('should pass for single common tutor ', async (done) => {
      await request(app).post('/api/register')
        .send({
          tutor: 'commonTutor@sample.com',
          students: commonTutorStudents
        })
      
      const { statusCode, body } = await request(app).get('/api/getcommonsstudents?tutor=commonTutor@sample.com').send()

      expect(body).toEqual({ students: commonTutorStudents })
      expect(statusCode).toEqual(200)
      done()
    })

    it('should pass for multiple common tutor', async (done) => {
      await request(app).post('/api/register')
        .send({
          tutor: 'commonTutor1@sample.com',
          students: commonTutorStudents1
        })
      
      const { statusCode, body } = await request(app).get('/api/getcommonsstudents?tutor=commonTutor@sample.com&&tutor=commonTutor1@sample.com').send()

      expect(body).toEqual({ students: commonTutorStudents1 })
      expect(statusCode).toEqual(200)
      done()
    })
  });
})