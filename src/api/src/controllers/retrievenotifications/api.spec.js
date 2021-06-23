require('mysql2/node_modules/iconv-lite').encodingExists('foo')

const request = require('supertest')
const app = require('../../testEntry')

describe('ReceiveNotifications API', () => {
  describe('Invalid body', () => {
    it('should fail if tutor is empty', async (done) => {
      const { statusCode, body } = await request(app).post('/api/retrievenotifications').send()
      const { message, details } = body

      expect(message).toEqual('Validation Failed')
      expect(details).toEqual([{ tutor: '"tutor" is required' }])
      expect(statusCode).toEqual(400)
      done()
    })

    it('should fail if notification is empty', async (done) => {
      const { statusCode, body } = await request(app).post('/api/retrievenotifications').send({ tutor: 'sampleTutor@sample.com' })
      const { message, details } = body

      expect(message).toEqual('Validation Failed')
      expect(details).toEqual([{ notification: '"notification" is required' }])
      expect(statusCode).toEqual(400)
      done()
    })
  })

  describe('Valid body', () => {
    it('should fail if tutor doesnt exist', async (done) => {
      const { statusCode, body } = await request(app).post('/api/retrievenotifications').send({ tutor: 'nonexistentTutor@sample.com', notification: 'Notification' })
      const { message } = body

      expect(message).toEqual('Resource Not Found')
      expect(statusCode).toEqual(404)
      done()
    })

    it('should pass and retrieve students that belongs to the tutor', async (done) => {
      await request(app).post('/api/register')
        .send({
          tutor: 'tutor@notification.com',
          students: [
            'student@notification.com',
            'student1@notification.com'
          ] 
        })
      
      const { statusCode, body } = await request(app).post('/api/retrievenotifications')
        .send({
          tutor: 'tutor@notification.com',
          notification: 'Only Enrolled Student'
        })

      expect(body).toEqual({ recipients: [ 'student@notification.com', 'student1@notification.com' ] })
      expect(statusCode).toEqual(200)
      done()
    })

    it('should pass and retrieve students that belongs to the tutor and mentioned students', async (done) => {
      await request(app).post('/api/register')
        .send({
          tutor: 'tutor1@notification.com',
          students: [
            'student2@notification.com'
          ] 
        })

      const { statusCode, body } = await request(app).post('/api/retrievenotifications')
        .send({
          tutor: 'tutor@notification.com',
          notification: 'Mentioned Students @student2@notification.com'
        })

      expect(body).toEqual({ recipients: [ 'student@notification.com', 'student1@notification.com', 'student2@notification.com' ] })
      expect(statusCode).toEqual(200)
      done()
    })

    it('should pass and retrieve students that are not suspended only', async (done) => {
      await request(app).post('/api/register')
        .send({
          tutor: 'tutor@notification.com',
          students: [
            'student3@notification.com'
          ] 
        })
      await request(app).post('/api/suspend').send({ student: 'student3@notification.com' })

      const { statusCode, body } = await request(app).post('/api/retrievenotifications')
        .send({
          tutor: 'tutor@notification.com',
          notification: 'Only Enrolled Student'
        })

      expect(body).toEqual({ recipients: [ 'student@notification.com', 'student1@notification.com' ] })
      expect(statusCode).toEqual(200)
      done()
    })
  })
})