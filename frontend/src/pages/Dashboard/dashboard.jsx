import { useState, useEffect } from "react";
import "./dashboard.css";
import { Link } from "react-router-dom";
import { fetchContact, deleteContact } from "../../services/contactServices";
import Header from "../../components/headerComponent"

const Dashboard = () => {
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const userId = localStorage.getItem('userId');


    useEffect(() => {
        const getContacts = async () => {
            try {
                const data = await fetchContact(userId);
                setContacts(data);
            } catch (error) {
                console.error("Error fetching contacts:", error)

            } finally {
                setLoading(false);
            }
        }

        getContacts();

    }, [userId]);


    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this contact?")) {
            try {
                await deleteContact(id);
                // Update the contacts state by removing the deleted contact
                setContacts((prevContacts) => prevContacts.filter((contact) => contact._id !== id));
            } catch (error) {
                console.error("Error deleting contact:", error);
            }
        }
    }

    const filteredContacts = contacts.filter((contact) => `${contact.name} ${contact.email} ${contact.phone}`.toLowerCase().includes(searchQuery.toLowerCase()))

    return (
        <>
            <Header />
            <div className="dashboard-container">
                <div className="dashboard-header">
                    <h2>Contact Dashboard</h2>
                    <Link to="/add" className="add-contact-button">Add Contact</Link>
                </div>

                {/* search input */}
                <div className="search-container">
                    <input type="text" placeholder="Search contact" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="search-input" />
                </div>

                {loading ? (
                    <p>Loading contacts...</p>
                ) : (
                    <table className="contacts-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredContacts.length > 0 ? (
                                filteredContacts.map((contact) => (
                                    <tr key={contact._id}>
                                        <td>{contact.name}</td>
                                        <td>{contact.email}</td>
                                        <td>{contact.phone}</td>
                                        <td className="actions">
                                            <Link to={`/edit/${contact._id}`} className="edit-button">Edit</Link>
                                            <button className="delete-button" onClick={() => handleDelete(contact._id)}>Delete</button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr><td colSpan="4">No contacts found.</td></tr>
                            )}
                        </tbody>
                    </table>
                )}
            </div>
        </>

    )
}
export default Dashboard;
