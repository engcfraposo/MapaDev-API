import { Router } from 'express';
import SearchController from '../controllers/SearchController';

const searchRouter = Router();

searchRouter.get('/', SearchController.index);

export default searchRouter;
