const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');
const authenticate = require('../middleware/authenticate')

router.post('/contacts', authenticate, contactController.createContact);

router.get('/contacts', authenticate, contactController.getAllContacts);

router.get('/contacts/:id', authenticate, contactController.getContactById);

router.put('/contacts/:id', authenticate, contactController.updateContact);

router.delete('/contacts/:id', authenticate, contactController.deleteContact);

module.exports = router;
