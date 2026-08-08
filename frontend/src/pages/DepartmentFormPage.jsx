import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../api/client';

function DepartmentFormPage() {
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            await apiClient.post('/departments', { name });
            navigate('/departments');
        } catch (err) {
            if (err.response?.status === 400) {
                setError(err.response.data.errors?.name || 'Invalid input');
            } else {
                console.error('Failed to create department', err);
            }
        }
    };

    return (
        <div className="container mt-4" style={{ maxWidth: '500px' }}>
            <h2 className="mb-4">Create Department</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input
                        type="text"
                        className={`form-control ${error ? 'is-invalid' : ''}`}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    {error && <div className="invalid-feedback">{error}</div>}
                </div>
                <button type="submit" className="btn btn-primary">Save</button>
            </form>
        </div>
    );
}

export default DepartmentFormPage;