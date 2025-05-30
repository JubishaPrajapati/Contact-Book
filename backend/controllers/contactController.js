const Contact = require('../models/Contact');

//create new contact
exports.createContact = async (req, res) => {
    try {
        const { name, email, phone } = req.body;
        const newContact = new Contact({ name, email, phone, userId: req.user.userId });        //new instance
        await newContact.save();
        res.status(201).json(newContact);  //sends newly created contact obj back to client as json res
    } catch (err) {
        res.status(500).json({ message: "Error creating contact", error: err.message });
    }
}

//get all contacts
exports.getAllContacts = async (req, res) => {
    try {
        console.log('User ID in request:', req.user?.userId);
        const contacts = await Contact.find({ userId: req.user.userId });
        res.status(200).json(contacts);
    } catch (err) {
        res.status(500).json({ messgae: 'Error fetching contacts', error: err.message });
    }
}

//get a single contact by id
exports.getContactById = async (req, res) => {
    try {
        const contactById = await Contact.findOne({ _id: req.params.id, userId: req.user.userId });
        if (!contactById) {
            return res.status(404).json({ message: "Contact not found or unauthorized" });
        }
        res.status(200).json(contactById);
    } catch (err) {
        res.status(500).json({ message: "Error fetching contact", error: err.message });
    }
}

//edit a contact by id
exports.updateContact = async (req, res) => {
    try {
        const updateContact = await Contact.findOneAndUpdate({ _id: req.params.id, userId: req.user.userId },
            req.body,
            { new: true });
        if (!updateContact) {
            return res.status(404).json({ message: "Contact not found" });
        }
        res.status(200).json(updateContact)
    } catch (err) {
        res.status(500).json({ message: "Error updating contact", error: err.message });
    }
}

//delete contact by id
exports.deleteContact = async (req, res) => {
    try {
        const deleteContact = await Contact.findOneAndDelete({ _id: req.params.id, userId: req.user.userId });
        if (!deleteContact) {
            return res.status(404).json({ messgae: "Contact not found" });
        }
        res.status(200).json({ message: 'Contact deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting contact', error: err.message });
    }
}