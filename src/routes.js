import { Router } from 'express';
import multer from 'multer';

import multerConfig from './config/multer';

import authMiddleware from './app/middlewares/auth';
import SessionController from './app/controllers/SessionController';
import RecipientController from './app/controllers/RecipientController';
import FileController from './app/controllers/FileController';
import DeliverymanController from './app/controllers/DeliverymanController';
import DeliveryController from './app/controllers/DeliveryController';

const upload = multer(multerConfig);

const routes = new Router();

// Sessions
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

// Authenticated Routes

// Recipients
routes.get('/recipients', RecipientController.index);
routes.post('/recipients', RecipientController.store);
routes.get('/recipients/:id', RecipientController.show);
routes.put('/recipients/:id', RecipientController.update);
routes.delete('/recipients/:id', RecipientController.destroy);

// Files
routes.post('/files', upload.single('file'), FileController.store);
routes.get('/files', FileController.index);

// Deliveryman
routes.get('/deliverymans', DeliverymanController.index);
routes.post('/deliverymans', DeliverymanController.store);
routes.put('/deliverymans/:id', DeliverymanController.update);
routes.delete('/deliverymans/:id', DeliverymanController.destroy);

// Delivery
routes.get('/deliveries', DeliveryController.index);
routes.post('/deliveries', DeliveryController.store);

export default routes;
