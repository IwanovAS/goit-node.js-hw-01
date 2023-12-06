const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
} = require("./contacts.js");

const argv = require("yargs").argv;

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const contactsData = await listContacts();
      console.table(contactsData);
      break;

    case "get":
      const contact = await getContactById(id);
      console.table(contact);
      break;

    case "add":
      const contactNew = await addContact(name, email, phone);
      console.table(contactNew);
      break;

    case "remove":
      const contactDel = await removeContact(id);
      console.table(contactDel);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
