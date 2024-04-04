import React, { useEffect, useState } from 'react';
import { useField } from "formik";
import { useData } from '../../context/DataContext';

interface Wallet {
    title: string;
    amount: number;
    currencyFlag: string;
}

const TransferForm = () => {
    const { data } = useData();
    const walletData: Wallet[] = data?.balanceCardData;
    const [walletField, walletMeta] = useField('wallet');
    const [amountField, amountMeta] = useField('amount');
    const [emailField, emailMeta] = useField('email');
    const [descriptionField, descriptionMeta] = useField('description');
    const [selectedWallet, setSelectedWallet] = useState<Wallet | null>(null);

    useEffect(() => {
        if (walletField.value) {
            const selected = walletData?.find(wallet => wallet.currencyFlag === walletField.value);
            setSelectedWallet(selected || null);
        }
    },[walletData, walletField.value]);

    return (
        <div className="flex flex-col item-start justify-start">
            <div className="form-control">
                <label className="block text-sm">Tú envías</label>
                <input
                    type="number"
                    {...amountField}
                    className="w-full border border-blue-gray-200 rounded-md py-2 px-4"
                    placeholder={'$ ' + (selectedWallet?.amount || 0).toString() + (selectedWallet?.currencyFlag || 'CLP')}
                    max={selectedWallet?.amount || 0}
                    disabled={selectedWallet?.amount === 0}
                    required
                />
                {amountMeta.error && amountMeta.touched && (
                    <div className="text-red">{amountMeta.error}</div>
                )}
                <p className="text-sm mt-2 text-blue2 font-semibold">Saldo disponible: $ {selectedWallet?.amount} {selectedWallet?.currencyFlag || 'CLP'}</p>
            </div>
            <div className="form-control">
                <label className="block text-sm">Billetera</label>
                <select
                    {...walletField}
                    className="w-full border border-blue-gray-200 rounded-md py-2 px-4"
                    required
                >
                    {walletData?.map((wallet, index) => (
                        <option key={index} value={wallet.currencyFlag}>
                            {wallet.title} - $ {wallet.amount} {wallet.currencyFlag}
                        </option>
                    ))}
                </select>
                {walletMeta.error && walletMeta.touched && (
                    <div className="text-red">{walletMeta.error}</div>
                )}
            </div>
            <h2 className="text-2xl mb-4 mt-10 font-semibold">Destinatario</h2>
            <div className="mb-4 form-control">
                <label className="block text-sm">Correo electrónico</label>
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
            <div className="mb-4 form-control">
                <label className="block text-sm">Descripción</label>
                <textarea
                    {...descriptionField}
                    className="w-full border border-blue-gray-200 rounded-md py-2 px-4"
                    placeholder="Escribe aquí un mensaje corto"
                    required
                />
                {descriptionMeta.error && descriptionMeta.touched && (
                    <div className="text-red">{descriptionMeta.error}</div>
                )}
            </div>
        </div>
    );
};

export default TransferForm;