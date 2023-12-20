const express = require('express');
const Note = require('../models/note');

const notesRouter = express.Router();

notesRouter.get('/', (request, response) => {
	Note.find({}).then((notes) => {
		response.status(200).json(notes);
	});
});

notesRouter.get('/:id', (request, response, next) => {
	Note.findById(request.params.id)
		.then((note) => {
			if (note) {
				response.status(200).json(note);
			} else {
				response.status(404).end();
			}
		})
		.catch((error) => {
			next(error);
		});
});

notesRouter.post('/', (request, response, next) => {
	const body = request.body;

	const newNote = new Note({
		content: body.content,
		important: body.important || false,
	});

	newNote
		.save()
		.then((savedNote) => {
			response.status(201).json(savedNote);
		})
		.catch((error) => next(error));
});

notesRouter.put('/:id', (request, response, next) => {
	const { content, important } = request.body;

	Note.findByIdAndUpdate(
		request.params.id,
		{ content, important },
		{ new: true, runValidators: true, context: 'query' }
	)
		.then((updatedNote) => {
			response.status(200).json(updatedNote);
		})
		.catch((error) => {
			next(error);
		});
});

notesRouter.delete('/:id', (request, response, next) => {
	Note.findByIdAndDelete(request.params.id)
		// eslint-disable-next-line no-unused-vars
		.then((result) => {
			response.status(204).end();
		})
		.catch((error) => {
			next(error);
		});
});

module.exports = notesRouter;
