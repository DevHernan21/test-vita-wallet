import * as Yup from 'yup';
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useData } from '../../context/DataContext';
import Swal from 'sweetalert2';


const useRegisterFormik = () => {
    const { register } = useAuth();
    const { data, setData } = useData();
    const navigate = useNavigate();

    const initialValues = {
        name: '',
        lastname: '',
        country: '',
        birthdate: '',
        email: '',
        password: '',
        confirmPassword: ''
    };

    const validationSchema = Yup.object({
        name: Yup.string().required('El nombre es obligatorio'),
        lastname: Yup.string().required('El apellido es obligatorio'),
        country: Yup.string().required('El país es obligatorio'),
        birthdate: Yup.string().required('La fecha de nacimiento es obligatoria'),
        email: Yup.string().email('El correo no es válido').required('El correo es obligatorio'),
        password: Yup.string().required('La contraseña es obligatoria'),
        confirmPassword: Yup.string().oneOf([Yup.ref('password'), undefined], 'Las contraseñas no coinciden').required('La confirmación de la contraseña es obligatoria'),
    });

    const onSubmit = async (values: any) => {
        const dataForRegister = {
            email: 'prospecto@vitawallet.io',
            password: 'Vita.1212',
            dev_mode: true,
        };
        
        const dataForDataContext = {
            ...data,
            registeredUser: {
                name: values.name,
                lastname: values.lastname,
                country: values.country,
                birthdate: values.birthdate,
                email: values.email,
                password: values.password,
            }
        }

        try {
            register && register(dataForRegister.email, dataForRegister.password, dataForRegister.dev_mode);
            setData(dataForDataContext);
            Swal.fire({
                title: '¡Registro exitoso!',
                text: `Bienvenido ${values.name} ${values.lastname} a la familia de Wallet App`,
                icon: 'success',
                confirmButtonText: 'Iniciar Sesión',
                preConfirm: () => {
                    navigate('/home' , { replace: true })
                }
            })
        } catch (err) {
            console.log(err);
        }
    };

    return { initialValues, validationSchema, onSubmit }
};

export default useRegisterFormik;