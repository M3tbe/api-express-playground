import { Router } from 'express';
import catsRouter from './cats';
import uploadRouter from './upload';
import helloRouter from './hello';

const router = Router();

router.use('/api/cats', catsRouter);
router.use('/api/upload', uploadRouter);
router.use('/', helloRouter);

export default router;
