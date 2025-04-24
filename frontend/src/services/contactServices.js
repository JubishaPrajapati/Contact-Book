import api from '../context/api';

export const fetchContact = async () => {
    try {
        const response = await api.get('/contacts', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        console.log("Contacts fetched:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching contacts:", error);
        throw error;
    }
};

export const createContact = async (contactData) => {
    try {
        const response = await api.post(`/contacts`, contactData, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        console.log("Response from createContact:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error creating contact:", error.response?.data || error.message);
        throw error;
    }
}

export const editContact = async (id, updateData) => {
    try {
        const response = await api.put(`/contacts/${id}`, updateData);
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.error("Error fetching contacts:", error);
    }
}
export const findContactById = async (id) => {
    try {
        const response = await api.get(`/contacts/${id}`);
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.error("Error fetching contacts:", error);
    }
}

export const deleteContact = async (id) => {
    try {
        const response = await api.delete(`/contacts/${id}`);
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.error("Error fetching contacts:", error);
        throw error;
    }
}
