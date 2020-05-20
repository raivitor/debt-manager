import { Router } from 'express';

const DebtCtrl = require('./controllers/DebtCtrl');
const UserCtrl = require('./controllers/UserCtrl');
const {
  validate,
  validateIdParam,
  validateDebt
} = require('./middlewares/validation');

const routes = new Router();

routes.get('/user', UserCtrl.listAll);

routes.get('/debt', DebtCtrl.listAll);
routes.get('/debt/:id', validate(validateIdParam), DebtCtrl.list);
routes.post('/debt', validate(validateDebt), DebtCtrl.create);
routes.put(
  '/debt/:id',
  validate([...validateIdParam, ...validateDebt]),
  DebtCtrl.update
);
routes.delete('/debt/:id', validate(validateIdParam), DebtCtrl.delete);

export default routes;
