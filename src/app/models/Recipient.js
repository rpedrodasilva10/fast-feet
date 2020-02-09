import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcrypt';
import authConfig from '../../config/auth';

class Recipient extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        street: Sequelize.STRING,
        street_number: Sequelize.INTEGER,
        city: Sequelize.STRING,
        complement: Sequelize.STRING,
        zipcode: Sequelize.STRING,
        state: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    return this;
  }
}

export default Recipient;
