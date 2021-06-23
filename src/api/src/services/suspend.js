import { NotFound } from "../helpers/errors"

export class Student {
  constructor(validatedArgs) {
    this.data = validatedArgs
  }

  async call() {
    const student = await db.Student.findOne({ where: { email: this.data.student } })

    if (!student) {
      throw new NotFound()
    }

    student.isSuspended = true

    await student.save()

    return student
  }
}