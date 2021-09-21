import {Router} from 'express';
import UserRoutes from './users.routes';
import SessionsRouter from './sessions.routes';
import ConnectionsRouter from './connections.routes';

const routes = Router();

routes.use('/users', UserRoutes);
routes.use('/sessions', SessionsRouter);
routes.use('/connections', ConnectionsRouter);

export default routes;
