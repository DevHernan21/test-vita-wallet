import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TransferForm from '../components/transferSteps/TransferForm';
import ResumeForm from '../components/transferSteps/ResumeForm';
import IconBack from '../assets/icons/icon-back.svg';
import { Formik, FormikHelpers } from 'formik';
import useTransferFormik from '../hooks/transfer/useTrasnferFormik';
import NotFoundPage from './NotFoundPage';
import TransferSuccess from '../components/transferSteps/TransferSuccess';

const labelSteps = [
    {
        id: 0,
        label: '¿Cuanto deseas enviar?'
    },
    {
        id: 1,
        label: 'Resumen'
    },
];

const renderStepContent = (step: number) => {
    switch (step) {
        case 0:
            return <TransferForm />;
        case 1:
            return <ResumeForm />;
        default:
            return <NotFoundPage />;
    }
}

interface FormValues {
    email: string;
    amount: number;
    description: string;
}

const TransferPage = () => {
    const { initialValues, validationSchema, onSubmit } = useTransferFormik();
    const [activeStep, setActiveStep] = useState<number>(0);
    const navigate = useNavigate();
    const isLastStep = activeStep === labelSteps.length - 1;

    const handleBack = () => {
        if (activeStep > 0) {
            setActiveStep((step) => step - 1);
        } else {
            navigate('/home', { replace: true });
        }
    }

    const handleSubmit = (values: FormValues, actions: FormikHelpers<FormValues>) => {
        if (isLastStep) {
            onSubmit(values);
            actions.setSubmitting(false);
            setActiveStep(activeStep + 1);
        } else {
            setActiveStep((step) => step + 1)
            actions.setTouched({});
            actions.setSubmitting(false);
        }
    }

    return (
        <div className="mt-12">
            <div className="w-full lg:w-3/5 flex flex-col item-start justify-start ml-20">
                {activeStep === labelSteps.length ? (
                    <TransferSuccess />
                ) : (
                    <>
                        <div className="flex items-center mb-14">
                            {labelSteps[activeStep].id === 1 && (
                                <button
                                    className="text-gray2 font-semibold mr-4"
                                    onClick={handleBack}
                                >
                                    <img src={IconBack} alt="Back" />
                                </button>
                            )}
                            <h1 className="text-2xl font-semibold">{labelSteps[activeStep].label}</h1>
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
                                            className={'bg-gradient-to-r from-blue1 to-blue2 text-white font-semibold rounded-md py-2 px-4 w-1/2'}
                                        >
                                            {isLastStep ? 'Transferir' : 'Continuar'}
                                        </button>
                                    </div>
                                </form>
                            )}
                        </Formik>
                    </>
                )}
            </div>
        </div>
    );
};

export default TransferPage;