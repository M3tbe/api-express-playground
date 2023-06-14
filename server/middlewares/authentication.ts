import { Request, Response, NextFunction } from 'express';
import { validApiKeys } from '../config';

export const authenticateApiKey = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const apiKey = req.headers['x-api-key'] as string;

	if (!apiKey || !validApiKeys.includes(apiKey)) {
		res.status(403).json({ message: 'Unauthorized. Invalid API Key.' });
	} else {
		next();
	}
};
