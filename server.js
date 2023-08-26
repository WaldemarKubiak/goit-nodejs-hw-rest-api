const mongoose = require('mongoose');
require('dotenv').config();
const app = require('./app');

const PORT = process.env.PORT || 3000;

const connection = mongoose.connect(process.env.DB_CONTACTS_URL, {
	dbName: 'db-contacts',
	useNewUrlParser: true,
	useUnifiedTopology: true,
});


connection
	.then(() => {
		console.log('Database connection successful');
		app.listen(PORT, () => {
			console.log(`App listens on port ${PORT}`);
		});
	})
	.catch(err => {
		console.error(`Error while establishing connection: [${err}]`);
		process.exit(1);
	});

// app.listen(3000, () => {
// 	console.log('Server running. Use our API on port: 3000');
// });
