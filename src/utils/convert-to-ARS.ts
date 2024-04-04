
const convertToARS = (amount: number, currency: string) => {
    let conversionRate;
    switch (currency) {
        case 'CLP':
            conversionRate = 0.88;
            break;
        case 'USD':
            conversionRate = 857.52;
            break;
        case 'USDT':
            conversionRate = 857.74;
            break;
        default:
            conversionRate = 1;
    }
    return amount * conversionRate;
}

export default convertToARS;