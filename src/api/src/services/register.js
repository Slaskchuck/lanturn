import { BadRequest } from '../helpers/errors'

export class Student {
  constructor(validatedArgs) {
    this.data = validatedArgs
  }

  async call() {
    const [ tutor ] = await db.Tutor.findOrCreate({ where: { email: this.data.tutor } })
    let students = await db.Student.findAll({ where: { email: this.data.students } })

    const missingStudent = this.data.students.filter(reqStudent =>
      !students.find(student => reqStudent === student.email)
    )
    
    if (!!missingStudent.length) {
      await db.Student.bulkCreate(missingStudent.map(student => ({ email: student })))
      students = await db.Student.findAll({ where: { email: this.data.students } })
    }

    const tutorStudents = await db.Tutors_Students.findAll({
      where: {
        studentId: students.map(student => student.id),
        tutorId: tutor.id
      },
      include: [
        {
          model: db.Student,
          attributes: ['email']
        }
      ]
    })

    if (!!tutorStudents.length) {
      throw new BadRequest(
        'Duplicate Data',
        tutorStudents.map(tutorStudent => ({
          [tutorStudent.Student.email]: "This email is already enrolled"
        }))
      )
    }

    await Promise.map(students, (student) => tutor.addStudent(student))
  }
}