const fs = require('fs/promises');
const path = require('node:path');

const contactsPath = path.join(__dirname, './contacts.json');

const listContacts = async () => {
	try {
		const contacts = await fs.readFile(contactsPath, 'utf8');
		const contactsList = await JSON.parse(contacts);
		return contactsList;
	} catch (err) {
		console.log(`Error Description>>> ${err.message}`.red);
	}
};

const getContactById = async contactId => {};

const removeContact = async contactId => {};

const addContact = async body => {};

const updateContact = async (contactId, body) => {};

module.exports = {
	listContacts,
	getContactById,
	removeContact,
	addContact,
	updateContact,
};
