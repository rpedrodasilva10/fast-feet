import { Router } from 'express';
import multer from 'multer';

import multerConfig from './config/multer';

import authMiddleware from './app/middlewares/auth';
import SessionController from './app/controllers/SessionController';
import RecipientController from './app/controllers/RecipientController';
import FileController from './app/controllers/FileController';
import DeliverymanController from './app/controllers/DeliverymanController';
import DeliveryController from './app/controllers/DeliveryController';
import DeliverymanDeliveryController from './app/controllers/DeliverymanDeliveryController';
import DoneDeliveryController from './app/controllers/DoneDeliveryController';
import StartDeliveryController from './app/controllers/StartDeliveryController';
import EndDeliveryController from './app/controllers/EndDeliveryController';
import DeliveryProblemsController from './app/controllers/DeliveryProblemsController';

const upload = multer(multerConfig);

const routes = new Router();

// Sessions
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

// Authenticated Routes

// Recipients
routes.get('/recipients', RecipientController.index);
routes.get('/recipients/:id', RecipientController.show);
routes.post('/recipients', RecipientController.store);
routes.put('/recipients/:id', RecipientController.update);
routes.delete('/recipients/:id', RecipientController.destroy);

// Files
routes.post('/files', upload.single('file'), FileController.store);
routes.get('/files', FileController.index);
routes.get('/files/:id', FileController.show);

// Deliveryman
routes.get('/deliverymans', DeliverymanController.index);
routes.get('/deliverymans/:id', DeliverymanController.show);
routes.post('/deliverymans', DeliverymanController.store);
routes.put('/deliverymans/:id', DeliverymanController.update);
routes.delete('/deliverymans/:id', DeliverymanController.destroy);

// Delivery
routes.get('/deliveries', DeliveryController.index);
routes.get('/deliveries/:id', DeliveryController.show);
routes.post('/deliveries', DeliveryController.store);
routes.put('/deliveries/:id', DeliveryController.update);
routes.delete('/deliveries/:id', DeliveryController.destroy);

// DeliverymanDelivery
routes.get('/deliverymans/:id/deliveries', DeliverymanDeliveryController.index);

// DoneDelivery
routes.get('/deliverymans/:id/done-deliveries', DoneDeliveryController.index);

// StartDelivery
routes.post(
  '/deliverymans/:deliveryman_id/deliveries/:delivery_id/start',
  StartDeliveryController.store
);

// EndDelivery
routes.post(
  '/deliverymans/:deliveryman_id/deliveries/:delivery_id/finish',
  upload.single('file'),
  EndDeliveryController.store
);

// DeliveryProblems
routes.get(
  '/deliveries/:delivery_id/problems',
  DeliveryProblemsController.index
);

routes.post(
  '/deliveries/:delivery_id/problems',
  DeliveryProblemsController.store
);

routes.delete(
  '/problems/:problem_id/cancel-delivery',
  DeliveryProblemsController.destroy
);
export default routes;
