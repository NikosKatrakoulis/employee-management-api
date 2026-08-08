import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import apiClient from '../api/client';
import { useAuth } from '../context/AuthContext';

function DepartmentsPage() {
    const [departments, setDepartments] = useState([]);
    const { user } = useAuth();

    const fetchDepartments = () => {
        apiClient.get('/departments')
            .then((response) => setDepartments(response.data))
            .catch((error) => console.error('Failed to fetch departments', error));
    };

    useEffect(() => {
        fetchDepartments();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this department?')) {
            return;
        }
        try {
            await apiClient.delete(`/departments/${id}`);
            fetchDepartments();
        } catch (error) {
            console.error('Failed to delete department', error);
        }
    };

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2>Departments</h2>
                {user?.role === 'ADMIN' && (
                    <Link to="/departments/new" className="btn btn-primary">+ Create Department</Link>
                )}
            </div>
            <table className="table table-striped table-hover">
                <thead>
                <tr>
                    <th>Name</th>
                    {user?.role === 'ADMIN' && <th style={{ width: '1%' }}>Actions</th>}
                </tr>
                </thead>
                <tbody>
                {departments.map((department) => (
                    <tr key={department.id}>
                        <td>{department.name}</td>
                        {user?.role === 'ADMIN' && (
                            <td style={{ width: '1%', whiteSpace: 'nowrap' }}>
                                <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(department.id)}>
                                    Delete
                                </button>
                            </td>
                        )}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default DepartmentsPage;