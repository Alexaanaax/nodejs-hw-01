import fs from 'node:fs/promises';
import { PATH_DB } from '../constants/contacts.js';
import { createFakeContact } from '../utils/createFakeContact.js';

const generateContacts = async (number) => {
  try {
    const fileContent = await fs.readFile(PATH_DB, 'utf8');
    const contacts = JSON.parse(fileContent);

    const newContacts = Array.from({ length: number }).map(createFakeContact);

    const updatedContacts = [...contacts, ...newContacts];

    await fs.writeFile(
      PATH_DB,
      JSON.stringify(updatedContacts, null, 2),
      'utf8',
    );

    console.log(`Successfully added ${number} new contacts.`);
  } catch (error) {
    console.error('Error generating contacts:', error);
  }
};

generateContacts(5);
