import api from '../context/api';

// Fetch all contacts
export const fetchContact = async () => {
    try {
        const response = await api.get('/contacts');
        console.log("Contacts fetched:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching contacts:", error.response?.data || error.message);
        throw error;
    }
};

// Create a new contact
export const createContact = async (contactData) => {
    try {
        const response = await api.post('/contacts', contactData);
        console.log("Response from createContact:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error creating contact:", error.response?.data || error.message);
        throw error;
    }
};

// Edit a contact by ID
export const editContact = async (id, updateData) => {
    try {
        const response = await api.put(`/contacts/${id}`, updateData);
        console.log("Updated contact:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error editing contact:", error.response?.data || error.message);
        throw error;
    }
};

// Get a contact by ID
export const findContactById = async (id) => {
    try {
        const response = await api.get(`/contacts/${id}`);
        console.log("Contact by ID:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching contact by ID:", error.response?.data || error.message);
        throw error;
    }
};

// Delete a contact
export const deleteContact = async (id) => {
    try {
        const response = await api.delete(`/contacts/${id}`);
        console.log("Deleted contact:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error deleting contact:", error.response?.data || error.message);
        throw error;
    }
};
