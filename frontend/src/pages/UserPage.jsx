import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import apiClient from '../api/client';

function UsersPage() {
    const [users, setUsers] = useState([]);

    const fetchUsers = () => {
        apiClient.get('/users')
            .then((response) => setUsers(response.data))
            .catch((error) => console.error('Failed to fetch users', error));
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this user?')) {
            return;
        }
        try {
            await apiClient.delete(`/users/${id}`);
            fetchUsers();
        } catch (error) {
            console.error('Failed to delete user', error);
        }
    };

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2>Users</h2>
                <Link to="/users/new" className="btn btn-primary">+ Create User</Link>

            </div>
            <table className="table table-striped table-hover">
                <thead>
                <tr>
                    <th>Username</th>
                    <th>Role</th>
                    <th style={{ width: '150px' }} className="text-end">Actions</th>
                </tr>
                </thead>
                <tbody>
                {users.map((user) => (
                    <tr key={user.id}>
                        <td>{user.username}</td>
                        <td><span className="badge-department">{user.role}</span></td>
                        <td style={{ width: '150px' }} className="text-end">
                            <Link to={`/users/${user.id}/edit`} className="btn btn-sm btn-outline-secondary me-1">Edit</Link>
                            <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(user.id)}>
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default UsersPage;