import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await login(username, password);
            navigate('/employees');
        } catch (err) {
            setError('Invalid username or password');
        }
    };

    return (
        <div
            className="d-flex justify-content-center align-items-center"
            style={{
                minHeight: '100vh',
                backgroundColor: '#f4f5f7',
            }}
        >
            <div
                className="bg-white p-5"
                style={{ width: '100%', maxWidth: '500px', borderRadius: '16px', boxShadow: '0 20px 60px rgba(0,0,0,0.2)', padding: '3rem' }}
            >
                <div className="text-center mb-4">
                    <h3 className="fw-bold mb-1">Welcome back</h3>
                    <p className="text-muted mb-0">Sign in to Employee Management</p>
                </div>

                {error && (
                    <div className="alert alert-danger py-2 small" role="alert">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label small fw-semibold text-muted">USERNAME</label>
                        <input
                            type="text"
                            className="form-control"
                            style={{ borderRadius: '10px', padding: '0.9rem 1rem', fontSize: '1rem', border: '1px solid #e2e4e9' }}
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            autoFocus
                        />
                    </div>
                    <div className="mb-4">
                        <label className="form-label small fw-semibold text-muted">PASSWORD</label>
                        <input
                            type="password"
                            className="form-control"
                            style={{ borderRadius: '10px', padding: '0.9rem 1rem', fontSize: '1rem', border: '1px solid #e2e4e9' }}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="btn w-100 fw-semibold text-white"
                        style={{ borderRadius: '10px', padding: '0.7rem', background: '#4f46e5', border: 'none' }}
                    >
                        Sign In
                    </button>
                </form>
            </div>
        </div>
    );
}

export default LoginPage;