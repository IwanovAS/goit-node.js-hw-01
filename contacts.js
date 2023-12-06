const fs = require("fs").promises;
const { nanoid } = require("nanoid");
const path = require("path");

const contactsPath = path.resolve("db/contacts.json");

console.log(contactsPath);

async function listContacts() {
  try {
    const listContacts = await fs.readFile(contactsPath);
    return JSON.parse(listContacts.toString());
  } catch (err) {
    console.log(err.message);
  }
}

async function getContactById(contactId) {
  try {
    const contactsData = await listContacts();
    const contact = contactsData.find(({ id }) => id === contactId);
    return contact || null;
  } catch (err) {
    console.log(err.message);
  }
}

async function removeContact(contactId) {
  try {
    const contactsData = await listContacts();
    const contactIdx = contactsData.findIndex(({ id }) => id === contactId);
    if (contactIdx === -1) {
      return null;
    }
    const contactDel = contactsData.splice(contactIdx, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contactsData));
    return contactDel;
  } catch (err) {
    console.log(err.message);
  }
}

async function addContact(name, email, phone) {
  try {
    const contactsData = await listContacts();
    const contactNew = {
      id: nanoid(),
      name,
      email,
      phone,
    };
    const contactNewArr = [contactNew, ...contactsData];
    await fs.writeFile(contactsPath, JSON.stringify(contactNewArr));
    return contactNew;
  } catch (err) {
    console.log(err.message);
  }
}

module.exports = { listContacts, getContactById, removeContact, addContact };
