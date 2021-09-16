import {Router} from 'express';
import UserRoutes from './users.routes';
import SessionsRouter from './sessions.routes';

const routes = Router();

routes.use('/users', UserRoutes);
routes.use('/sessions', SessionsRouter);

export default routes;
