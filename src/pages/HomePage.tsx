import BalanceCard from '../components/BalanceCard';
import { useAuth } from '../context/AuthContext';
import balanceWalletData from '../utils/balance-card-data';
import IconCash from '../assets/icons/icon-cash.png';
import historyTableData from '../utils/history-table-data';
import { useData } from '../context/DataContext';
import { useEffect } from 'react';
import { GetData } from '../services/axios.service';
import sumBalances from '../utils/sum-balances';

const HomePage = () => {
    const { user } = useAuth();
    const { data, setData } = useData();

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (user) {
                    const responseData = await GetData();
                    let allBalances;
                    if (!data?.balanceCardData) {
                        allBalances = sumBalances(responseData?.profile?.attributes?.balances, data?.balanceCardData ? data?.balanceCardData : balanceWalletData);
                    }
                    setData({
                        profile: responseData?.profile,
                        prices: responseData?.prices,
                        transactions: responseData?.transactions,
                        balanceCardData: data?.balanceCardData ? data?.balanceCardData : allBalances,
                        historyTableData: data?.historyTableData ? data?.historyTableData : historyTableData
                    });
                }
            } catch (error) {
                console.error(error);
            }
        }
        fetchData();
    }, []);

    return (
        <div className="mt-6">
            <div className="mb-10 flex">
                <img src={IconCash} alt="logo" className="w-12 h-12 mr-4" />
                <h1 className="text-2xl font-semibold text-blue-gray-800">
                    ¡Hola <span className="text-blue2">{user?.attributes?.first_name || 'Hernán'}</span>!
                </h1>
            </div>
            <h2 className="text-xl font-semibold text-blue-gray-800 mb-4">Mis Saldos</h2>
            <div className="mb-10 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-3">
                {data?.balanceCardData?.map((card: any, index: any) => (
                    <BalanceCard key={index} {...card} />
                ))}
            </div>
            <h2 className="text-xl font-semibold text-blue-gray-800 mb-6">Historial</h2>
            <div className="mb-8 flex flex-col gap">
                <table className="w-full min-w-[640px] table-auto">
                    <tbody>
                        {data?.historyTableData?.map((row: any, index: any) => (
                            <tr key={index} className="border-b border-blue-gray-200 grid grid-cols-2 gap-4 place-content-between">
                                <td className="py-3 justify-self-start">
                                    {row.type}</td>
                                <td
                                    className={`py-3 justify-self-end ${row.type === 'Recibiste' || row.type === 'Recargaste' ? 'text-blue2' :
                                        row.type === 'Transferiste' ? 'text-red' :
                                            row.type === 'Intercambiaste' ? 'text-black' :
                                                'inherit'
                                        }`}
                                >
                                    {row.amount}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default HomePage;