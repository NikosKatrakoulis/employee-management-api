import {useState, useEffect} from "react";
import apiClient from "../api/client";

function EmployeesPage() {
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        apiClient.get('/employees')
            .then((response) => setEmployees(response.data))
            .catch((error) => console.error('Failed to fetch employees', error));
    }, []);

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2>Employees</h2>
                {user?.role === 'ADMIN' && (
                    <Link to="/employees/new" className="btn btn-primary">+ Create Employee</Link>
                )}
            </div>
            <table className="table table-striped">
                <thead>
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Department</th>
                    <th>Salary</th>
                </tr>
                </thead>
                <tbody>
                {employees.map((employee) => (
                    <tr key={employee.id}>
                        <td>{employee.firstName}</td>
                        <td>{employee.lastName}</td>
                        <td>{employee.email}</td>
                        <td>{employee.departmentName}</td>
                        <td>{employee.salary}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default EmployeesPage;