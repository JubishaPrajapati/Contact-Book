import React, { useEffect, useState } from "react";
import "./AddEditContact.css";
import { useNavigate, useParams } from "react-router-dom";
import { createContact, editContact, findContactById } from "../services/contactServices"

const AddEditContact = () => {

    const [contact, setContact] = useState({ name: "", email: "", phone: "" });
    const { id } = useParams();
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchContactForEdit = async () => {
            try {
                const data = await findContactById(id);
                setContact(data);
            } catch (error) {
                console.error("Error fetching contact:", error);
            }
        };
        if (id) {
            fetchContactForEdit(id);
        }
    }, [id])

    const handleChange = (e) => {
        setContact({ ...contact, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        //validations
        if (contact.name.trim().length <= 2) {
            setMessage("Full name must be more than 2 characters.");
            return;
        }
        const phoneRegex = /^\d{10}$/;
        if (!phoneRegex.test(contact.phone)) {
            setMessage("Phone number must be exactly 10 digits and contain only numbers.");
            return;
        }

        try {
            if (id) {
                await editContact(id, contact);
            } else {
                const newContact = await createContact(contact);  // Add new contact
                console.log("New contact added:", newContact);
            }
            navigate("/dashboard")
        } catch (error) {
            console.error("Error saving contact:", error);
        }
    }

    return (
        <div className="form-container">
            <h2>{id ? "Edit Contact" : "Add Contact"}</h2>
            <form onSubmit={handleSubmit}>
                <label>Name:</label>
                <input type="text" name="name" value={contact.name} onChange={handleChange} required />
                <label>Email:</label>
                <input type="email" name="email" value={contact.email} onChange={handleChange} required />
                <label>Phone:</label>
                <input type="tel" name="phone" value={contact.phone} onChange={handleChange} required />
                <button type="submit">{id ? "Update" : "Add"} Contact</button>
            </form>
            {message && <p className="error-msg ">{message}</p>}
        </div >
    )
}
export default AddEditContact;