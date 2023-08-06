const fs = require('fs/promises');
const path = require('node:path');
const { nanoid } = require('nanoid');

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

const getContactById = async contactId => {
	try {
		const contacts = await listContacts();
		const contactById = await contacts.find(
			contact => contact.id === contactId.toString()
		);
		return contactById;
	} catch (err) {
		console.log(`Error Description>>> ${err.message}`.red);
	}
};

const removeContact = async contactId => {
	try {
		const contacts = await listContacts();
		const contactToRemove = await contacts.find(
			contact => contact.id === contactId.toString()
		);
		if (!contactToRemove) {
			return null;
		}
		const newContactsList = await contacts.filter(
			contact => contact.id !== contactId
		);
		await fs.writeFile(
			contactsPath,
			JSON.stringify(newContactsList, null, 2),
			'utf8'
		);
		return newContactsList;
	} catch (err) {
		console.log(`Error Description>>> ${err.message}`.red);
	}
};

const addContact = async body => {
	try {
		const contacts = await listContacts();
		const newContact = {
			id: nanoid(),
			...body,
		};

		const newContactsList = [...contacts, newContact];
		await fs.writeFile(contactsPath, JSON.stringify(newContactsList, null, 2));
		return newContact;
	} catch (err) {
		console.log(`Error Description>>> ${err.message}`.red);
	}
};

const updateContact = async (contactId, body) => {
	try {
		const contacts = await listContacts();
		const updatedContacts = await contacts.map(contact =>
			contact.id === contactId.toString() ? { ...contact, ...body } : contact
		);
		console.log(updatedContacts);
		await fs.writeFile(
			contactsPath,
			JSON.stringify(updatedContacts, null, 2),
			'utf8'
		);
		const upDatedContact = await updatedContacts.filter(
			elem => elem.id === contactId.toString()
		);
		return upDatedContact;
	} catch (err) {
		console.log(`Error Description>>> ${err.message}`.red);
	}
};

module.exports = {
	listContacts,
	getContactById,
	removeContact,
	addContact,
	updateContact,
};
