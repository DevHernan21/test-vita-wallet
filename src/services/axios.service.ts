import {
    API_POST_LOGIN,
    API_GET_PROFILE,
    API_GET_PRICES,
    API_GET_TRANSACTIONS,
    API_POST_EXCHANGE
} from "../utils/api-constants";
import axios from "axios";

export const Login = async (loginData: any) => {
    try {
        const response = await axios.post(API_POST_LOGIN, loginData, {
            headers: {
                'app-name': 'ANGIE',
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        });
        return response;
    } catch (error: any) {
        return error;
    }
}

export const GetData = async () => {
    try {
        const transactions = await GetTransactions();
        const profile = await GetProfile();
        const prices = await GetPrices();
        return {
            transactions: transactions,
            profile: profile,
            prices: prices
        }
    } catch (error) {
        console.error('hubo error en GetData en axios.services: ',error);
    }
}

const GetProfile = async () => {
    try {
        const response = await axios.get(API_GET_PROFILE);
        return response.data.data;
    } catch (error) {
        console.error(error);
    }
}

const GetPrices = async () => {
    try {
        const response = await axios.get(API_GET_PRICES);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

const GetTransactions = async () => {
    try {
        const response = await axios.get(API_GET_TRANSACTIONS);
        return response.data.data;
    } catch (error) {
        console.error(error);
    }
}

export const PostExchage = async (data: any) => {
    try {
        const response = await axios.post(API_POST_EXCHANGE, data);
        return response;
    } catch (error) {
        console.error(error);
    }
}
