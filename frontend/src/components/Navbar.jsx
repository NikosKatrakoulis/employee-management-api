import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <Link className="navbar-brand" to="/employees">Employee Management</Link>
                <div className="navbar-nav">
                    <Link className="nav-link" to="/employees">Employees</Link>
                    <Link className="nav-link" to="/departments">Departments</Link>
                </div>
                <div className="navbar-nav ms-auto d-flex align-items-center">
                    {user && <span className="navbar-text me-3">{user.username}</span>}
                    <button className="btn btn-outline-light btn-sm" onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;