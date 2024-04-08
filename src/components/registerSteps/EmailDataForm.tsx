import { useField } from "formik";
import { useState } from "react";
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

const EmailDataForm = () => {
    const [emailField, emailMeta] = useField('email');
    const [passwordField, passwordMeta] = useField('password');
    const [confirmPasswordField, confirmPasswordMeta] = useField('confirmPassword');
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    return (
        <div className="felx flex-col item-start justify-start">
            <div className="form-control mb-4">
                <label className="block text-sm">Email</label>
                <input
                    type="email"
                    {...emailField}
                    className="w-full border border-blue-gray-200 rounded-md py-2 px-4"
                    placeholder="Email"
                    required
                />
                {emailMeta.error && emailMeta.touched && (
                    <div className="text-red">{emailMeta.error}</div>
                )}
            </div>
            <div className="form-control mb-4 relative">
                <label className="block text-sm">Contraseña</label>
                <input
                    type={showPassword ? "text" : "password"}
                    {...passwordField}
                    className="w-full border border-blue-gray-200 rounded-md py-2 px-4"
                    placeholder="Contraseña"
                    required
                />
                <div onClick={togglePasswordVisibility} className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer h-88">
                    {showPassword ? <EyeIcon className="h-6 w-6" /> : <EyeSlashIcon className="h-6 w-6" />}
                </div>
                {passwordMeta.error && passwordMeta.touched && (
                    <div className="text-red">{passwordMeta.error}</div>
                )}
            </div>
            <div className="form-control mb-4 relative">
                <label className="block text-sm">Confirmar contraseña</label>
                <input
                    type={showConfirmPassword ? "text" : "password"}
                    {...confirmPasswordField}
                    className="w-full border border-blue-gray-200 rounded-md py-2 px-4"
                    placeholder="Confirmar contraseña"
                    required
                />
                <div onClick={toggleConfirmPasswordVisibility} className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer h-88">
                    {showConfirmPassword ? <EyeIcon className="h-6 w-6" /> : <EyeSlashIcon className="h-6 w-6" />}

                </div>
                {confirmPasswordMeta.error && confirmPasswordMeta.touched && (
                    <div className="text-red">{confirmPasswordMeta.error}</div>
                )}
            </div>
        </div>
    );
};

export default EmailDataForm;