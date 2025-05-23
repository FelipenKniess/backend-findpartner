﻿import {Router} from 'express';
import UserRoutes from './users.routes';
import SessionsRouter from './sessions.routes';
import ConnectionsRouter from './connections.routes';
import InterestsRouter from './interests.routes';
import ProductsRouter from './products.routes';

const routes = Router();

routes.use('/users', UserRoutes);
routes.use('/sessions', SessionsRouter);
routes.use('/connections', ConnectionsRouter);
routes.use('/interests', InterestsRouter);
routes.use('/products', ProductsRouter);

export default routes;
