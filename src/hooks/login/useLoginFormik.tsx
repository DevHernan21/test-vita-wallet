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
            .email('Debe ser un email válido')
            .required('Tu correo electrónico es requerido.'),
        password: Yup.string()
            .required('Tu contraseña es requerida.'),
    });

    const onSubmit = async (values: any) => {
        const data = {
            email: values.email,
            password: values.password,
            dev_mode: true,
        };

        try {
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