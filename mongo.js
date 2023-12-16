import mongoose from 'mongoose';

if (process.argv.length < 3) {
	console.log('Give password as argument');
	process.exit(1);
}

const password = process.argv[2];

const mongoUri = `mongodb+srv://abhi_07:${password}@cluster0.lf3y9.mongodb.net/noteApp?retryWrites=true&w=majority`;

mongoose.set('strictQuery', false);
mongoose.connect(mongoUri);

const noteSchema = mongoose.Schema({
	content: String,
	important: Boolean,
	date: {
		type: Date,
		default: Date.now,
	},
});

const Note = mongoose.model('Note', noteSchema);

// eslint-disable-next-line no-unused-vars
const note = new Note({
	content: 'GET and POST are the most important methods of HTTP protocol',
	important: true,
});

// note.save().then((result) => {
// 	console.log('Note saved');
// 	mongoose.connection.close();
// });

Note.find({ important: true }).then((result) => {
	result.forEach((note) => {
		console.log(note);
	});
	mongoose.connection.close();
});
