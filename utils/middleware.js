import { info, errorLog } from './logger.js';

export const requestLogger = (request, response, next) => {
	info('Method: ', request.method);
	info('Path: ', request.path);
	info('Body: ', request.body);
	info('_____');
	next();
};

export const unknownEndpoint = (request, response) => {
	response.status(404).send({ error: 'unknown endpoint' });
};

export const errorHandler = (error, request, response, next) => {
	errorLog(error.message);

	if (error.name === 'CastError') {
		return response.status(400).send({ error: 'malformed id' });
	} else if (error.name === 'ValidationError') {
		return response.status(400).json({ error: error.message });
	}

	next(error);
};
