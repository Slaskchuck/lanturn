import { NotFound } from '../helpers/errors'

export class Student {
  constructor(validatedArgs) {
    this.data = validatedArgs
  }

  async call() {
    const tutor = await db.Tutor.findOne({ 
      where: { email: this.data.tutor },
      include: [
        {
          model: db.Student,
          attributes: ['id', 'email', 'isSuspended'],
          where: { isSuspended: false }
        }
      ]
    })

    if (!tutor) {
      throw new NotFound()
    }

    const mentionedEmailPattern = /(?<=\B@)[\S+@\S+\.\S+]+/gi

    const mentionedEmails = await db.Student.findAll({
      where: {
        email: this.data.notification.match(mentionedEmailPattern),
        isSuspended: false
      }
    })

    return [
      ...tutor.Students.map(student => student.email),
      ...mentionedEmails.map(student => student.email)
    ]
  }
}