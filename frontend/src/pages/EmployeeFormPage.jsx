import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import apiClient from '../api/client';

function EmployeeFormPage() {
    const { id } = useParams();
    const isEditMode = Boolean(id);

    const [departments, setDepartments] = useState([]);
    const [formData, setFormData] = useState({
        firstName: '', lastName: '', email: '', departmentId: '', salary: '',
    });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        apiClient.get('/departments')
            .then((response) => setDepartments(response.data))
            .catch((error) => console.error('Failed to fetch departments', error));
    }, []);

    useEffect(() => {
        if (isEditMode) {
            apiClient.get(`/employees/${id}`)
                .then((response) => {
                    const employee = response.data;
                    setFormData({
                        firstName: employee.firstName,
                        lastName: employee.lastName,
                        email: employee.email,
                        departmentId: employee.departmentId,
                        salary: employee.salary,
                    });
                })
                .catch((error) => console.error('Failed to fetch employee', error));
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
                await apiClient.put(`/employees/${id}`, formData);
            } else {
                await apiClient.post('/employees', formData);
            }
            navigate('/employees');
        } catch (err) {
            if (err.response?.status === 400) {
                setErrors(err.response.data.errors || {});
            } else {
                console.error('Failed to save employee', err);
            }
        }
    };

    return (
        <div className="container mt-5" style={{ maxWidth: '560px' }}>
            <div className="bg-white p-5" style={{ borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
                <h3 className="fw-bold mb-4">{isEditMode ? 'Edit Employee' : 'Create Employee'}</h3>

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label small fw-semibold text-muted">FIRST NAME</label>
                        <input
                            type="text" name="firstName"
                            className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                            style={{ borderRadius: '10px', padding: '0.75rem 1rem', border: '1px solid #e2e4e9' }}
                            value={formData.firstName} onChange={handleChange}
                        />
                        {errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
                    </div>

                    <div className="mb-3">
                        <label className="form-label small fw-semibold text-muted">LAST NAME</label>
                        <input
                            type="text" name="lastName"
                            className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                            style={{ borderRadius: '10px', padding: '0.75rem 1rem', border: '1px solid #e2e4e9' }}
                            value={formData.lastName} onChange={handleChange}
                        />
                        {errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}
                    </div>

                    <div className="mb-3">
                        <label className="form-label small fw-semibold text-muted">EMAIL</label>
                        <input
                            type="text" name="email"
                            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                            style={{ borderRadius: '10px', padding: '0.75rem 1rem', border: '1px solid #e2e4e9' }}
                            value={formData.email} onChange={handleChange}
                        />
                        {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                    </div>

                    <div className="mb-3">
                        <label className="form-label small fw-semibold text-muted">DEPARTMENT</label>
                        <select
                            name="departmentId"
                            className={`form-control ${errors.departmentId ? 'is-invalid' : ''}`}
                            style={{ borderRadius: '10px', padding: '0.75rem 1rem', border: '1px solid #e2e4e9' }}
                            value={formData.departmentId} onChange={handleChange}
                        >
                            <option value="">-- Select a department --</option>
                            {departments.map((department) => (
                                <option key={department.id} value={department.id}>{department.name}</option>
                            ))}
                        </select>
                        {errors.departmentId && <div className="invalid-feedback">{errors.departmentId}</div>}
                    </div>

                    <div className="mb-4">
                        <label className="form-label small fw-semibold text-muted">SALARY</label>
                        <input
                            type="number" step="0.01" name="salary"
                            className={`form-control ${errors.salary ? 'is-invalid' : ''}`}
                            style={{ borderRadius: '10px', padding: '0.75rem 1rem', border: '1px solid #e2e4e9' }}
                            value={formData.salary} onChange={handleChange}
                        />
                        {errors.salary && <div className="invalid-feedback">{errors.salary}</div>}
                    </div>

                    <div className="d-flex gap-2">
                        <button
                            type="submit" className="btn fw-semibold text-white"
                            style={{ borderRadius: '10px', padding: '0.75rem 1.5rem', background: '#4f46e5', border: 'none' }}
                        >
                            Save
                        </button>
                        <Link
                            to="/employees" className="btn fw-semibold"
                            style={{ borderRadius: '10px', padding: '0.75rem 1.5rem', border: '1px solid #e2e4e9', color: '#4b5563' }}
                        >
                            Cancel
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EmployeeFormPage;