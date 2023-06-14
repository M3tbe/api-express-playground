import { Router, Request, Response, NextFunction } from 'express';

const router = Router();

router.get('/', (req: Request, res: Response, next: NextFunction) => {
	res.status(200).json('Hello from Mathieu!');
});

router.get('/api/ping', (req: Request, res: Response, next: NextFunction) => {
	res.status(200).json('pong');
});

export default router;
