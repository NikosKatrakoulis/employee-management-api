import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const linkStyle = (path) => ({
        color: location.pathname.startsWith(path) ? '#ffffff' : '#9ca3af',
        fontWeight: location.pathname.startsWith(path) ? 600 : 400,
        padding: '0.5rem 0.9rem',
        borderRadius: '8px',
        backgroundColor: location.pathname.startsWith(path) ? 'rgba(255,255,255,0.08)' : 'transparent',
        transition: 'all 0.15s ease',
    });

    return (
        <nav
            className="navbar navbar-expand-lg navbar-dark"
            style={{
                backgroundColor: '#1a1d29',
                padding: '0.85rem 0',
                boxShadow: '0 2px 12px rgba(0,0,0,0.15)',
            }}
        >
            <div className="container d-flex align-items-center">
                <Link className="navbar-brand fw-bold d-flex align-items-center gap-2" to="/employees">
                    Employee Management
                </Link>

                <div className="navbar-nav flex-row gap-1 ms-4">
                    <Link className="nav-link" to="/employees" style={linkStyle('/employees')}>Employees</Link>
                    <Link className="nav-link" to="/departments" style={linkStyle('/departments')}>Departments</Link>
                    {user?.role === 'ADMIN' && (
                        <Link className="nav-link" to="/users" style={linkStyle('/users')}>Users</Link>
                    )}
                </div>

                <div className="d-flex align-items-center gap-3 ms-auto">
                    {user && (
                        <div className="d-flex align-items-center gap-2">
                            <div
                                style={{
                                    width: '32px', height: '32px', borderRadius: '50%',
                                    background: '#374151', color: '#e5e7eb',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontSize: '13px', fontWeight: 600, textTransform: 'uppercase',
                                }}
                            >
                                {user.username.charAt(0)}
                            </div>
                            <span className="text-white-50 small">{user.username}</span>
                        </div>
                    )}
                    <button
                        className="btn btn-sm"
                        style={{ color: '#e5e7eb', border: '1px solid #374151', borderRadius: '8px' }}
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;