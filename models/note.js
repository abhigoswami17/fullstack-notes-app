import * as dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';

mongoose.set('strictQuery', false);

const mongoUri = process.env.MONGODB_URI;

// const mongodbUri = 'mongodb://127.0.0.1:27017/noteApp';

console.log(`Connecting to ${mongoUri}`);

mongoose
	.connect(mongoUri)
	// eslint-disable-next-line no-unused-vars
	.then((result) => {
		console.log('Connected to MongoDB');
	})
	.catch((error) => {
		console.log(`Error connecting to MongoDB: ${error.message}`);
	});

const noteSchema = mongoose.Schema({
	content: {
		type: String,
		minLength: 5,
		required: true,
	},
	important: Boolean,
	date: {
		type: Date,
		default: Date.now,
	},
});

noteSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject._id;
		delete returnedObject.__v;
	},
});

const Note = mongoose.model('Note', noteSchema);

export default Note;
