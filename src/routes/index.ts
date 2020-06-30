import { Router } from 'express';
import devsRoutes from './devs.routes';
import searchsRoutes from './search.routes';

const routes = Router();

routes.use('/devs', devsRoutes);
routes.use('/search', searchsRoutes);

export default routes;
