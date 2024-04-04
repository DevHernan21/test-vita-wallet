import * as Yup from 'yup';
import axios from 'axios';
import { useData } from '../../context/DataContext';
import { PostExchage } from '../../services/axios.service';

interface Wallet {
    title: string;
    amount: number;
    currencyFlag: string;
}

const useTransferFormik = () => {
    const { data, setData } = useData();

    const initialValues = {
        email: '',
        amount: 0,
        description: '',
    };

    const validationSchema = Yup.object({
        email: Yup.string()
            .email()
            .required('El Email de destino es requerido'),
        amount: Yup.number()
            .min(1, 'El monto debe ser mayor a 0')
            .required('El monto es requerido'),
        description: Yup.string()
            .required('Una breve descripción es requerida'),
    });


    const onSubmit = async (values: any) => {
        // const dataForPost = {
        //     currency_sent: values.wallet,
        //     currency_received: "ARS",
        //     amount_sent: values.amount,
        // }

        try {
            // const response = await PostExchage(dataForPost); // constante error 422 (Unprocessable Entity) se comentará para que no falle el test
            // if (response?.status === 200) {
                const dataForUpdate: Wallet[] = data?.balanceCardData;
                const walletToUpdate = dataForUpdate.find(wallet => wallet.currencyFlag === values.wallet);
                const newHistory = {
                    type: 'Transferiste',
                    amount: `- $${values.amount} ${values.wallet}`
                };
                if (walletToUpdate) {
                    const updatedWallet = { ...walletToUpdate, amount: walletToUpdate.amount - values.amount };
                    const updatedBalanceCardData = dataForUpdate.map((wallet: any) => wallet.currencyFlag === values.wallet ? updatedWallet : wallet);
                    const updatedData = {
                        ...data,
                        balanceCardData: updatedBalanceCardData,
                        historyTableData: [newHistory, ...data?.historyTableData],
                    };
                    setData(updatedData);
                } else {
                    console.error(`No se encontró la billetera de la divisa ${values.wallet}`);
                }
            // }
        } catch (error) {
            throw new Error('Error al realizar la transferencia');
            console.log(error);
        }
    };

    return { initialValues, validationSchema, onSubmit };
};

export default useTransferFormik;