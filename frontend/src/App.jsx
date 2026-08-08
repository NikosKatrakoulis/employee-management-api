import {Routes, Route, Navigate} from "react-router-dom";
import LoginPage from './pages/LoginPage'
import EmployeesPage from './pages/EmployeesPage'
import EmployeeFormPage from './pages/EmployeeFormPage';
import DepartmentsPage from './pages/DepartmentsPage';
import DepartmentFormPage from './pages/DepartmentFormPage';
import Navbar from "./components/Navbar";
import {useAuth} from "./context/AuthContext";
import UsersPage from './pages/UserPage';
import UserFormPage from './pages/UserFormPage';



function Layout({children}) {
    return (
        <>
            <Navbar/>
            {children}
        </>
    );
}

function App() {
    const {user} = useAuth();

    return (
        <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/employees" element={user ? <Layout><EmployeesPage /></Layout> : <Navigate to="/login" replace />} />
            <Route path="/employees/new" element={user ? <Layout><EmployeeFormPage /></Layout> : <Navigate to="/login" replace />} />
            <Route path="/employees/:id/edit" element={user ? <Layout><EmployeeFormPage /></Layout> : <Navigate to="/login" replace />} />
            <Route path="/departments" element={user ? <Layout><DepartmentsPage /></Layout> : <Navigate to="/login" replace />} />
            <Route path="/departments/new" element={user ? <Layout><DepartmentFormPage /></Layout> : <Navigate to="/login" replace />} />
            <Route path="/users" element={user?.role === 'ADMIN' ? <Layout><UsersPage /></Layout> : <Navigate to="/employees" replace />} />
            <Route path="/users/new" element={user?.role === 'ADMIN' ? <Layout><UserFormPage /></Layout> : <Navigate to="/employees" replace />} />
            <Route path="/users/:id/edit" element={user?.role === 'ADMIN' ? <Layout><UserFormPage /></Layout> : <Navigate to="/employees" replace />} />
        </Routes>
    );
}

export default App;
