import 'dotenv/config';

import Sequelize from 'sequelize';

import User from '../app/models/User';
import Recipient from '../app/models/Recipient';
import Deliveryman from '../app/models/Deliveryman';
import File from '../app/models/File';
import Delivery from '../app/models/Delivery';
import DeliveryProblems from '../app/models/DeliveryProblems';

import databaseConfig from '../config/database';

const models = [User, Recipient, Deliveryman, File, Delivery, DeliveryProblems];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    // models.map(model => model.init(this.connection));
    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
