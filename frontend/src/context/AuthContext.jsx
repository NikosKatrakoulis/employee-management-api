import { createContext, useContext, useState} from 'react';
import apiClient from "../api/client.js";

const AuthContext = createContext(null);

export function AuthProvider({children}) {
    const [user, setUser] = useState(() => {
        const username = localStorage.getItem('username');
        const role = localStorage.getItem('role');
        return username ? { username, role} : null;
    });

    const login = async (username, password) => {
        const response = await apiClient.post('/auth/login', {username,password});
        const { token, username: returnedUsername, role} = response.data;

        localStorage.setItem('token', token);
        localStorage.setItem('username', returnedUsername);
        localStorage.setItem('role', role);

        setUser({ username: returnedUsername, role});
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.removeItem('role');
        setUser(null);
    };

    return(
        <AuthContext.Provider value={{user, login,logout}}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}