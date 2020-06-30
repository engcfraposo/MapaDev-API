import { Router } from 'express';
import DevController from '../controllers/DevController';

const devsRouter = Router();

devsRouter.get('/', DevController.index);
devsRouter.post('/', DevController.store);

export default devsRouter;
