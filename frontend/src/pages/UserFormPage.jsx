import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import apiClient from '../api/client';

function UserFormPage() {
    const { id } = useParams();
    const isEditMode = Boolean(id);

    const [formData, setFormData] = useState({ username: '', password: '', role: 'USER' });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        if (isEditMode) {
            apiClient.get(`/users/${id}`)
                .then((response) => {
                    setFormData({ username: response.data.username, password: '', role: response.data.role });
                })
                .catch((error) => console.error('Failed to fetch user', error));
        }
    }, [id, isEditMode]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        try {
            if (isEditMode) {
                await apiClient.put(`/users/${id}`, formData);
            } else {
                await apiClient.post('/users', formData);
            }
            navigate('/users');
        } catch (err) {
            if (err.response?.status === 400) {
                setErrors(err.response.data.errors || {});
            } else {
                console.error('Failed to save user', err);
            }
        }
    };

    return (
        <div className="container mt-5" style={{ maxWidth: '500px' }}>
            <div className="bg-white p-5" style={{ borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
                <h3 className="fw-bold mb-4">{isEditMode ? 'Edit User' : 'Create User'}</h3>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label small fw-semibold text-muted">USERNAME</label>
                        <input
                            type="text" name="username"
                            className={`form-control ${errors.username ? 'is-invalid' : ''}`}
                            style={{ borderRadius: '10px', padding: '0.75rem 1rem', border: '1px solid #e2e4e9' }}
                            value={formData.username} onChange={handleChange}
                        />
                        {errors.username && <div className="invalid-feedback">{errors.username}</div>}
                    </div>

                    <div className="mb-3">
                        <label className="form-label small fw-semibold text-muted">PASSWORD</label>
                        <input
                            type="text" name="password"
                            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                            style={{ borderRadius: '10px', padding: '0.75rem 1rem', border: '1px solid #e2e4e9' }}
                            value={formData.password} onChange={handleChange}
                            placeholder={isEditMode ? 'Leave blank to keep current password' : ''}
                        />
                        {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                        <div className="form-text">
                            {isEditMode ? 'Leave blank to keep the current password.' : 'Share this password with the user directly.'}
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="form-label small fw-semibold text-muted">ROLE</label>
                        <select
                            name="role" className="form-control"
                            style={{ borderRadius: '10px', padding: '0.75rem 1rem', border: '1px solid #e2e4e9' }}
                            value={formData.role} onChange={handleChange}
                        >
                            <option value="USER">USER</option>
                            <option value="ADMIN">ADMIN</option>
                        </select>
                    </div>

                    <button type="submit" className="btn fw-semibold text-white"
                            style={{ borderRadius: '10px', padding: '0.75rem 1.5rem', background: '#4f46e5', border: 'none' }}>
                        {isEditMode ? 'Save Changes' : 'Create'}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default UserFormPage;