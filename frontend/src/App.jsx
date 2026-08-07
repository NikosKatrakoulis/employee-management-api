import {Routes, Route, Navigate} from "react-router-dom";
import LoginPage from './pages/LoginPage'
import EmployeesPage from './pages/EmployeesPage'
import EmployeeFormPage from './pages/EmployeeFormPage';
import Navbar from "./components/Navbar";
import {useAuth} from "./context/AuthContext";

function Layout({children}) {
    return (
        <>
            <Navbar/>
            {children}
        </>
    );
}

function App() {
    const { user } = useAuth();

    return (
        <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<LoginPage />} />
            <Route
                path="/employees"
                element={user ? <Layout><EmployeesPage /></Layout> : <Navigate to="/login" replace />}
            />
            <Route
                path="/employees/new"
                element={user ? <Layout><EmployeeFormPage/></Layout> : <Navigate to="/login" replace />}
                />
        </Routes>
    );
}

export default App;
