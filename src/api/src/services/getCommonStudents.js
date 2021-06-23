import { fn, col, Op } from 'sequelize'

export class CommonStudent {
  constructor(args) {
    this.data = args
  }

  async call() {
    const requestTutors = Array.isArray(this.data.tutor) ? this.data.tutor : [ this.data.tutor ]
    const tutors = await db.Tutor.findAll({ where: { email: requestTutors } })

    let query = {
      attributes: [
        'studentId',
        [
          fn(
            'COUNT',
            col('studentId')
          ),
          'studentCount'
        ]
      ],
      where: {
        tutorId: tutors.map(tutor => tutor.id)
      },
      include: [
        {
          model: db.Student,
          attributes: ['id', 'email']
        }
      ],
      group: 'studentId'
    }

    if (requestTutors.length > 1) {
      query =  {
        ...query,
        having: {
          studentCount: {
            [Op.gt]: 1
          }
        }
      }
    }

    return Promise.map(
      db.Tutors_Students.findAll(query),
      ({ Student: { email } }) => email
    )
  }
}