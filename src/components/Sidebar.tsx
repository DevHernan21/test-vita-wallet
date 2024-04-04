import React from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import TransferPage from '../pages/TransferPage';
import RechargePage from '../pages/RechargePage';
import CryptoPage from '../pages/CryptoPage';
import ProfilePage from '../pages/ProfilePage';
import HelpPage from '../pages/HelpPage';
import { useAuth } from '../context/AuthContext';

const navigation = [
    { name: 'Inicio', href: '/home', current: true, key: 'home', component: HomePage },
    { name: 'Transferir', href: '/transfer', current: false, key: 'transfer', component: TransferPage },
    { name: 'Recargar', href: '/recharge', current: false, key: 'recharge', component: RechargePage },
    { name: 'Crypto', href: '/crypto', current: false, key: 'crypto', component: CryptoPage },
    { name: 'Perfil', href: '/profile', current: false, key: 'profile', component: ProfilePage },
    { name: 'Ayuda', href: '/help', current: false, key: 'help', component: HelpPage },
];

const Sidebar = () => {
    const { logout } = useAuth();
    const [currentRoute, setCurrentRoute] = React.useState('/' + window.location.pathname.split('/')[1]);
    const navigate = useNavigate();

    const handleRoute = (route: string) => {
        setCurrentRoute(route);
        navigate(route);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login', { replace: true });
        logout;
    }

    return (
        <aside className="fixed h-screen w-72 bg-blue1 bg-[url('/src/assets/images/image-back-menu.png')] bg-cover bg-no-repeat text-white hidden sm:block">
            <div className="m-4">
                <ul className="mb-4 flex flex-col gap-1 mt-24">
                    {navigation.map((item) => (
                        <li key={item.key} className="mx-3.5">
                            <NavLink to={item.href}>
                                {({ isActive }) => (
                                    <button
                                        className={`${isActive && 'bg-blue2'
                                            } relative overflow-hidden flex items-center w-full text-white font-semibold py-3 px-4 rounded-full transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-blue2 before:transition-all before:duration-300 hover:text-white hover:before:left-0 hover:before:w-full`}
                                        onClick={() => handleRoute(item.href)}
                                    >
                                        <span className="relative z-10">{item.name}</span>
                                    </button>
                                )}
                            </NavLink>
                        </li>
                    ))}
                </ul>
                <div className="absolute bottom-0 mx-4">
                    <button
                        className="bg-red-500 hover:bg-red-600 text-white pb-6 rounded"
                        onClick={handleLogout}
                    >
                        Cerrar sesión
                    </button>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
