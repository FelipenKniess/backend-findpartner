import {Router} from 'express';
import UserRoutes from './users.routes';
import SessionsRouter from './sessions.routes';

const routes = Router();

routes.get('/users', UserRoutes);
routes.get('/sessions', SessionsRouter);

export default routes;
