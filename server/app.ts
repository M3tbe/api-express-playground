import * as express from 'express';
import * as session from 'express-session';
import * as fs from 'fs';
import * as path from 'path';
import axios from 'axios';
import { sessionConfig, gifUrls, dbJsonPath } from './config';
import router from './routes';
import {
	authenticateApiKey,
	csrfProtection,
	morganLogger,
	errorHandler,
} from './middlewares';

const app: express.Application = express();

/**
 * Fetch GIFs and save to db.json
 */

axios
	.get(gifUrls)
	.then((response) => {
		fs.writeFileSync(
			path.join(__dirname, dbJsonPath),
			JSON.stringify(response.data)
		);
	})
	.catch((error) => {
		console.log(error);
	});

/**
 * Configure app
 */
app.use(session(sessionConfig));

/**
 * Middlewares
 */
app.use(morganLogger);
app.use(authenticateApiKey);
app.use(csrfProtection);
app.use(errorHandler);

/**
 * Routes
 */
app.use('/', router);

export { app };
