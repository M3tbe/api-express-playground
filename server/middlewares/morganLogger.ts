import * as morgan from 'morgan';
import { morganLogFormat } from '../config';

export const morganLogger = morgan(morganLogFormat);
