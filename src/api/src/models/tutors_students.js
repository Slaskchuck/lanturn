'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tutors_Students extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Tutor)
      this.belongsTo(models.Student)
    }
  };
  Tutors_Students.init({
    studentId: DataTypes.INTEGER,
    tutorId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Tutors_Students',
  });
  return Tutors_Students;
};