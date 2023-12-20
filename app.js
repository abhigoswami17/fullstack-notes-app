const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const notesRouter = require('./controllers/notes');
const config = require('./utils/config');
const { info, errorLog } = require('./utils/logger');
const {
	requestLogger,
	unknownEndpoint,
	errorHandler,
} = require('./utils/middleware');

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

module.exports = app;
