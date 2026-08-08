import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import apiClient from '../api/client';
import { useAuth } from '../context/AuthContext';

function EmployeesPage() {
    const [employees, setEmployees] = useState([]);
    const { user } = useAuth();

    const fetchEmployees = () => {
        apiClient.get('/employees')
            .then((response) => setEmployees(response.data))
            .catch((error) => console.error('Failed to fetch employees', error));
    };

    useEffect(() => {
        fetchEmployees();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this employee?')) {
            return;
        }
        try {
            await apiClient.delete(`/employees/${id}`);
            fetchEmployees();
        } catch (error) {
            console.error('Failed to delete employee', error);
        }
    };

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2>Employees</h2>
                {user?.role === 'ADMIN' && (
                    <Link to="/employees/new" className="btn btn-primary">+ Create Employee</Link>
                )}
            </div>
            <table className="table table-striped table-hover">
                <thead>
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Department</th>
                    <th>Salary</th>
                    {user?.role === 'ADMIN' && <th>Actions</th>}
                </tr>
                </thead>
                <tbody>
                {employees.map((employee) => (
                    <tr key={employee.id}>
                        <td>{employee.firstName}</td>
                        <td>{employee.lastName}</td>
                        <td>{employee.email}</td>
                        <td><span className="badge-department">{employee.departmentName}</span></td>
                        <td>{employee.salary}</td>
                        {user?.role === 'ADMIN' && (
                            <td className="d-flex gap-2">
                                <Link to={`/employees/${employee.id}/edit`} className="btn btn-sm btn-outline-secondary">Edit</Link>
                                <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(employee.id)}>
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

export default EmployeesPage;