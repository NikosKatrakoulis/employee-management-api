import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import apiClient from "../api/client";

function EmployeeFormPage() {
    const [departments, setDepartments] = useState([]);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        departmentId: '',
        salary: '',
    });
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        apiClient.get('/departments')
            .then((response) => setDepartments(response.data))
            .catch((error) => console.error('Failed to fetch departments', error));
    }, []);

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});

        try {
            await apiClient.post('/employees', formData);
            navigate('/employees');
        } catch (err) {
            if (err.response?.status === 400) {
                setErrors(err.response.data.errors || {});
            } else {
                console.error('Failed to create employee', err);
            }
        }
    };

    return (
        <div className="container mt-4" style={{maxWidth: '500px'}}>
            <h2 className="mb-4">Create Employee</h2>

            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">First Name</label>
                    <input
                        type="text"
                        name="firstName"
                        className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                        value={formData.firstName}
                        onChange={handleChange}
                    />
                    {errors.firstName && <div className={"invalid-feedback"}>{errors.firstName}</div>}
                </div>

                <div className="mb-3">
                    <label className="form-label">Last Name</label>
                    <input
                        type="text"
                        name="lastName"
                        className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                        value={formData.lastName}
                        onChange={handleChange}
                    />
                    {errors.lastName && <div className={"invalid-feedback"}>{errors.lastName}</div>}
                </div>
            </form>
        </div>
    )
}