import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/AuthPages/login";
import Register from "./pages/AuthPages/register";
import Dashboard from "./pages/Dashboard/dashboard";
import ContactForm from "./pages/ContactForm/contactForm";
import PrivateRoute from "./context/PrivateRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Private route wraps the protected routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/add" element={<ContactForm />} />
          <Route path="/edit/:id" element={<ContactForm />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
