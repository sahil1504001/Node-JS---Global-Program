import {CustomLogger} from '../logger/custom-logger';

const logger = CustomLogger.logger;

export function unhandledRejectionHandler(reason: any, promise: any) {
    logger.error({message: 'Unhandled Rejection', promise, reason});
}

export function unhandledErrorHandler (err: any, req: any, res: any, next: any) {
    logger.error({message: `Unhandled Error - ${err}`});
    res.status(500).send('Internal Server Error');
}
