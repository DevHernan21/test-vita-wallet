
import React from 'react';
import CurrencyFlag from 'react-currency-flags';

interface BalanceCardProps {
    title: string,
    amount: number,
    currencyFlag: string,
}

const BalanceCard = (props: BalanceCardProps) => {
    const { title, amount, currencyFlag } = props;
    
    return (
        <div className="card border border-gray1 shadow-sm bg-gray3 p-4 rounded-lg">
            <div className="card-header flex justify-between items-center mb-6">
                <span className="text-md font-normal">{title}</span>
                <CurrencyFlag currency={currencyFlag} size="md" />
            </div>
            <div className="card-body">
                <span className="amount text-xl font-bold">$ {amount}</span>
            </div>
        </div>
    );
};

export default BalanceCard;