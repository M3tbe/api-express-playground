import { NextFunction, Request, Response } from 'express';

interface ErrorHandlerError extends Error {
	code?: string;
}

export const errorHandler = (
	err: ErrorHandlerError,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	if (err.code === 'EBADCSRFTOKEN') {
		// CSRF token errors
		return res
			.status(403)
			.json({ error: 'Request has been tampered with.' });
	}

	// Others
	return res
		.status(500)
		.json({ error: err.message || 'An unknown error occurred.' });
};
