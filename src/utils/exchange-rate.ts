
const exchangeRate = (currency: string) => {
    switch (currency) {
        case 'CLP':
            return 0.88;
        case 'USD':
            return 857.52;
        case 'USDT':
            return 857.74;
        default:
            return 1;
    }
}

export default exchangeRate;