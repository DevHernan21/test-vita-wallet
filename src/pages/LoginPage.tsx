import React, { useState } from 'react';
import useLoginFormik from '../hooks/login/useLoginFormik';
import ImageLogin from '../assets/images/image-login.png';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'

const Login = () => {
    const { formik } = useLoginFormik();
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="h-screen flex justify-center items-center">
            <div className="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
                <form onSubmit={formik.handleSubmit} className="card-body w-[387px]">
                    <h1 className="mb-32 text-4xl font-bold text-center">Iniciar Sesión</h1>
                    <div className="form-control mb-4" >
                        <label htmlFor="email" className="block">
                            <span className="label-text">Correo Electrónico</span>
                        </label>
                        <input
                            type="text"
                            id="email"
                            name="email"
                            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                            onChange={formik.handleChange}
                            value={formik.values.email}
                            autoComplete="off"
                        />
                        {formik.errors.email && formik.touched.email && (
                            <div className="text-red">{formik.errors.email}</div>
                        )}
                    </div>
                    <div className="form-control mb-4 relative">
                        <label htmlFor="password" className="block">
                            Contraseña
                        </label>
                        <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            name="password"
                            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                            onChange={formik.handleChange}
                            value={formik.values.password}
                            autoComplete="off"
                        />
                        <div onClick={togglePasswordVisibility} className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer h-88">
                            {showPassword ? <EyeIcon className="h-6 w-6" /> : <EyeSlashIcon className="h-6 w-6" />}
                        </div>
                        {formik.errors.password && formik.touched.password && (
                            <div className="text-red">{formik.errors.password}</div>
                        )}
                    </div>
                    <div className="form-control mb-4 text-right">
                        <a href="/" className="text-sm text-blue-500 hover:text-blue-600">¿Olvidaste tu contraseña?</a>
                    </div>
                    <div className="form-control mt-6">
                        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full mt-4">
                            Iniciar Sesión
                        </button>
                    </div>
                </form>
            </div>
            <div className="w-1/2 h-dvh">
                <img src={ImageLogin} alt="Imagen de inicio de sesión" className="object-cover w-auto h-auto" />
            </div>
        </div>
    );
};

export default Login;