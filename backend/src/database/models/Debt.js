const { Model, DataTypes } = require('sequelize');

class Debt extends Model {
  static init(sequelize) {
    super.init(
      {
        idUser: {
          type: DataTypes.INTEGER,
          field: 'id_user'
        },
        reason: DataTypes.STRING,
        date: DataTypes.DATE,
        value: DataTypes.DECIMAL
      },
      {
        sequelize
      }
    );
  }
}

module.exports = Debt;
