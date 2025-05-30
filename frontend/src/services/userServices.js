import api from '../context/api';

export const registerUser = async (userData) => {
    try {
        console.log(userData)
        const response = await api.post('/users/register', userData);
        console.log(response.data)

        return response.data;
    } catch (error) {
        console.error("Error fetching user:", error);
    }
}

export const loginUser = async (userData) => {
    try {
        const response = await api.post('/users/login', userData);
        return response.data;
    } catch (error) {
        console.error("Error fetching user:", error);
    }
}