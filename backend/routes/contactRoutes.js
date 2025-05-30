const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authenticate');
const { createContact, getAllContacts, getContactById, updateContact, deleteContact } = require('../controllers/contactController');

router.use(authenticate);

router.post('/', createContact);

router.get('/', getAllContacts);

router.get('/:id', getContactById);

router.put('/:id', updateContact);

router.delete('/:id', deleteContact);

module.exports = router;
