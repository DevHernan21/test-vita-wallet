import Sidebar from "../components/Sidebar";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import Loader from "../components/commons/Loader";
import Login from "../pages/LoginPage";

const PrivateLayout = () => {
    const { token } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        if (!token) {
            navigate('/login', { replace: true })
        }
    }, [token, navigate]);

    useEffect(() => {
        setTimeout(() => setLoading(false), 5000);
    }, [])

    return loading ? (
        <Loader />
    ) : (
        <>
            <div className="min-h-screen bg-blue-gray-50/50">
                <Sidebar />
                <div className="pt-4 pl-4 pb-4 pr-28 xl:ml-80">
                    <Outlet />
                </div>
            </div>
        </>
    )
};

export default PrivateLayout;