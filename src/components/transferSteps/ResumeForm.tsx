import { useFormikContext } from "formik";
import { useEffect, useState } from "react";
import convertToARS from "../../utils/convert-to-ARS";
import exchangeRate from "../../utils/exchange-rate";
import currentDate from "../../utils/current-date";

interface FormValues {
    email: string;
    amount: number;
    description: string;
    wallet: string;
}

const ResumeForm = () => {
    const { values } = useFormikContext<FormValues>();
    const [currency, setCurrency] = useState<string>('');
    const convertedAmount = convertToARS(values.amount, currency);
    const rate = exchangeRate(currency);

    useEffect(() => {
        setCurrency(values.wallet);
    }, [values.wallet])

    return (
        <div className="flex flex-col item-start justify-start bg-gray3 p-4 rounded-lg border border-gray1 shadow-sm">
            <div className="flex justify-between w-full">
                <p>Destinatario</p>
                <p className="font-semibold">{values.email}</p>
            </div>
            <div className="flex justify-between w-full">
                <p>Tú envias</p>
                <p className="text-blue2 font-semibold">$ {values.amount} {values.wallet}</p>
            </div>
            <div className="flex justify-between w-full">
                <p>Tasa de cambio</p>
                <p className="font-semibold">1 {values.wallet} = {rate} ARS</p>
            </div>
            <div className="flex justify-between w-full">
                <p>Destinatario recibe</p>
                <p className="text-blue2 font-semibold">$ {convertedAmount} ARS</p>
            </div>
            <div className="flex justify-between w-full">
                <p>Fecha de arribo</p>
                <p className="font-semibold">{currentDate}</p>
            </div>
        </div>
    );
}

export default ResumeForm;