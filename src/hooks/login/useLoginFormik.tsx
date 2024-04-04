import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";


const useLoginFormik = () => {
    const { login } = useAuth();
    const navigate = useNavigate();

    const initialValues = {
        email: '',
        password: '',
        devMode: false,
    };

    const validationSchema = Yup.object({
        email: Yup.string()
            .email()
            .matches(
                /^prospecto@vitawallet\.io$/,
                'El correo electrónico es incorrecto.'
            )
            .required('Requerido'),
        password: Yup.string()
            .min(9, 'La contraseña debe tener 9 caracteres')
            .matches(
                /^Vita\.1212$/,
                'La contraseña es incorrecta.'
            )
            .required('Requerido'),
    });

    const onSubmit = async (values: any) => {
        const data = {
            email: values.email,
            password: values.password,
            dev_mode: true,
        };

        try {
            navigate("/home", { replace: true });
            login && login(data.email, data.password, data.dev_mode);
        } catch (err) {
            console.log(err);
        }
    };

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit,
    });
    
    return { formik };
};

export default useLoginFormik;