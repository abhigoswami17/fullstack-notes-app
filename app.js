import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import notesRouter from './controllers/notes.js';
import config from './utils/config.js';
import { info, errorLog } from './utils/logger.js';
import {
	requestLogger,
	unknownEndpoint,
	errorHandler,
} from './utils/middleware.js';

const app = express();

mongoose.set('strictQuery', false);

const mongoUri = config.MONGODB_URI;

info(`Connecting to ${mongoUri}`);

mongoose
	.connect(mongoUri)
	// eslint-disable-next-line no-unused-vars
	.then((result) => {
		info('Connected to MongoDB');
	})
	.catch((error) => {
		errorLog(`Error connecting to MongoDB: ${error.message}`);
	});

app.use(cors());
app.use(express.json());

app.use(requestLogger);

app.use('/api/notes', notesRouter);

app.use(unknownEndpoint);

app.use(errorHandler);

export default app;
