import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AddEditContact from "./pages/AddEditContact";
import Login from "./pages/Login";
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
          <Route path="/add" element={<AddEditContact />} />
          <Route path="/edit/:id" element={<AddEditContact />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
