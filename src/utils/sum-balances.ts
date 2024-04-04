
interface Balance {
    [key: string]: number;
}

interface CardBalance {
    title?: string;
    amount?: number;
    currencyFlag?: string;
}

interface BalanceCard {
    title: string;
    amount: number;
    currencyFlag: string;
}

const sumBalances = (balances: Balance, cardBalances: CardBalance[]): BalanceCard[] => {
    return cardBalances.map(cardBalance => {
        if (!balances) {
            throw new Error('Balances is null or undefined');
        }
        const balanceKey = Object.keys(balances).find(key => key.toLowerCase() === cardBalance.currencyFlag?.toLowerCase());
        if (balanceKey) {
            return {
                title: cardBalance.title || '',
                amount: (cardBalance.amount || 0) + balances[balanceKey],
                currencyFlag: cardBalance.currencyFlag || '',
            };
        } else {
            return {
                title: cardBalance.title || '',
                amount: cardBalance.amount || 0,
                currencyFlag: cardBalance.currencyFlag || '',
            };
        }
    });
}

export default sumBalances;