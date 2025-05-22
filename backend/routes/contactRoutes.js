const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authenticate');
const { createContact, getAllContacts, getContactById, updateContact, deleteContact } = require('../controllers/contactController');

router.use(authenticate);

router.post('/contacts', createContact);

router.get('/contacts', getAllContacts);

router.get('/contacts/:id', getContactById);

router.put('/contacts/:id', updateContact);

router.delete('/contacts/:id', deleteContact);

module.exports = router;
