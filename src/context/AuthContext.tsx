import axios from "axios";
import { ReactNode, createContext, useContext, useEffect, useMemo, useState } from "react";
import { Login } from "../services/axios.service";
import Swal from "sweetalert2";
import { useNavigate } from 'react-router-dom';

interface IAuthContext {
    user?: Record<string, any> | null;
    setUser?: any;
    token: string | null;
    client: string;
    uid: string;
    expiry: string;
    login: (email: string, password: string, dev_mode: boolean) => void;
    register: (email: string, password: string, dev_mode: boolean) => void;
    logout: () => void;
};

const AuthContext = createContext<IAuthContext | undefined>(undefined);

const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<Record<string, any> | null>(null);
    const [token, setToken_] = useState(localStorage.getItem("token"));
    const [client, setClient] = useState<string>('');
    const [uid, setUid] = useState<string>('');
    const [expiry, setExpiry] = useState<string>('');
    const navigate = useNavigate();

    useEffect(() => {
        if (token) {
            axios.defaults.headers.common['Access-Token'] = token;
            axios.defaults.headers.common['Client'] = client;
            axios.defaults.headers.common['Uid'] = uid;
            axios.defaults.headers.common['Expiry'] = expiry;
            localStorage.setItem('token', token);
        } else {
            delete axios.defaults.headers.common['Access-Token'];
            delete axios.defaults.headers.common['Client'];
            delete axios.defaults.headers.common['Uid'];
            delete axios.defaults.headers.common['Expiry'];
            localStorage.removeItem('token');
        }
    }, [token])

    const login = async (email: string, password: string, dev_mode: boolean) => {
        const loginData = {
            email,
            password,
            dev_mode,
        }
        try {
            const response = await Login(loginData);
            if (response?.status !== 200) {
                const title = 'Login incorrecto';
                const message = 'Usted no posee una cuenta en nuestra plataforma, regístrese con nosotros para disfrutar de los beneficios que tenemos preparados para ti';
                Swal.fire({
                    icon: 'error',
                    title: title,
                    text: message,
                    showCancelButton: true,
                    preConfirm: () => {
                        navigate('/register')
                    }
                })
            } else {
                const data = await response?.data.data;
                const accessToken = await response?.headers['access-token'];
                const client = await response?.headers['client'];
                const uid = await response?.headers['uid'];
                const expiry = await response?.headers['expiry'];
                setUser(data);
                setToken_(accessToken);
                setClient(client);
                setUid(uid);
                setExpiry(expiry);
                navigate("/home", { replace: true });
            }
            return;
        } catch (error) {
            console.error(error);
        }
    };

    const register = async (email: string, password: string, dev_mode: boolean) => {
        const registerData = {
            email,
            password,
            dev_mode
        };
        try {
            const response = await Login(registerData);
            if (response?.status !== 200) {
                const title = 'Registro incorrecto';
                const message = 'Hubo un error en el registro, por favor intente nuevamente';
                Swal.fire({
                    icon: 'error',
                    title: title,
                    text: message,
                    showCancelButton: true,
                    preConfirm: () => {
                        navigate('/register')
                    }
                })
            } else {
                const data = await response?.data.data;
                const accessToken = await response?.headers['access-token'];
                const client = await response?.headers['client'];
                const uid = await response?.headers['uid'];
                const expiry = await response?.headers['expiry'];
                setUser(data);
                setToken_(accessToken);
                setClient(client);
                setUid(uid);
                setExpiry(expiry);
            }
            return;
        } catch (error) {
            console.error(error);
        }
    }

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
        setToken_(null);
        setClient('');
        setUid('');
        setExpiry('');
    }

    const values = {
        user,
        setUser,
        login,
        logout,
        token,
        client,
        uid,
        expiry,
        register,
    }

    return (
        <AuthContext.Provider value={values}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth debe usarse dentro del AuthProvider');
    }
    return context;
};