import React, { useNavigate } from "react-router-dom";
import IconBack from '../assets/icons/icon-back.svg';
import ImageRegister from '../assets/images/image-coins.png';
import useRegisterFormik from "../hooks/register/useRegisterFormik";
import PersonalDataForm from "../components/registerSteps/PersonalDataForm";
import EmailDataForm from "../components/registerSteps/EmailDataForm";
import { useState } from "react";
import { Formik, FormikHelpers } from "formik";

const labelSteps = [
    {
        id: 0,
        label: 'Datos Personales'
    },
    {
        id: 1,
        label: 'Datos de Acceso'
    },
];

const renderStepContent = (step: number) => {
    switch (step) {
        case 0:
            return <PersonalDataForm />;
        case 1:
            return <EmailDataForm />;
        default:
            return null;
    }
}

interface FormValues {
    name: string,
    lastname: string,
    country: string,
    birthdate: string,
    email: string,
    password: string,
    confirmPassword: string,
}

const RegisterPage = () => {
    const { initialValues, validationSchema, onSubmit } = useRegisterFormik();
    const [activeStep, setActiveStep] = useState<number>(0);
    const isLastStep = activeStep === labelSteps.length - 1;
    const navigate = useNavigate();

    const handleBack = () => {
        if (activeStep > 0) {
            setActiveStep((step) => step - 1);
        } else {
            navigate('/login', { replace: true });
        }
    }

    const handleSubmit = (values: FormValues, actions: FormikHelpers<FormValues>) => {
        if (isLastStep) {
            onSubmit(values);
            setActiveStep(activeStep + 1);
            actions.setSubmitting(false);
        } else {
            setActiveStep((step) => step + 1)
            actions.setTouched({});
            actions.setSubmitting(false);
        }
    }

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };


    return (
        <>
            {activeStep === labelSteps.length ? (
                <div></div>
            ) : (
                <>
                    <div className="h-screen flex justify-center items-center">
                        <div className="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
                            <div className="flex items-center mb-8 mt-10">
                                <button
                                    className="text-gray2 font-semibold mr-4"
                                    onClick={handleBack}
                                >
                                    <img src={IconBack} alt="Back" />
                                </button>
                                <h1 className="text-4xl font-bold text-center">Registrarme</h1>
                            </div>
                            <div className="flex justify-between items-center mb-8 w-[387px]">
                                {labelSteps.map((step, index) => (
                                    <div
                                        key={index}
                                        className={`p-2 rounded ${activeStep >= index ? 'bg-blue2' : 'bg-gray2'}`}
                                    >
                                        {step.label}
                                    </div>
                                ))}
                            </div>
                            <Formik
                                initialValues={initialValues}
                                onSubmit={handleSubmit}
                                validationSchema={validationSchema}
                                validateOnChange={false}
                            >
                                {({ isSubmitting, handleSubmit, isValid }) => (
                                    <form onSubmit={handleSubmit} className="w-[387px]">
                                        {renderStepContent(activeStep)}
                                        <div className="flex flex-row form-control mt-20">
                                            <button
                                                type="button"
                                                onClick={handleBack}
                                                className="bg-white text-blue1 font-semibold rounded-md py-2 px-4 w-1/2 mr-4 border border-gradient-to-r from-blue1 to-blue2"
                                            >
                                                Atras
                                            </button>
                                            <button
                                                type="submit"
                                                onClick={isLastStep ? undefined : handleNext}
                                                className={'bg-gradient-to-r from-blue1 to-blue2 text-white font-semibold rounded-md py-2 px-4 w-1/2'}
                                            >
                                                {isLastStep ? 'Registrar' : 'Continuar'}
                                            </button>
                                        </div>
                                    </form>
                                )}
                            </Formik>
                        </div>
                        <div className="w-1/2 h-dvh">
                            <img src={ImageRegister} alt="Imagen de inicio de sesión" className="object-cover w-auto h-auto" />
                        </div>
                    </div >
                </>
            )}
        </>
    )
}

export default RegisterPage