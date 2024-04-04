import { createContext, useContext, useState } from "react";

interface IDataContext {
    data?: Record<string, any>;
    setData?: any;
}; 

const DataContext = createContext<IDataContext | undefined>(undefined);

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
    const [data, setData] = useState<Record<string, any>>({});

    return (
        <DataContext.Provider value={{ data, setData }}>
            {children}
        </DataContext.Provider>
    );
};

export const useData = () => {
    const context = useContext(DataContext);
    if (!context) {
        throw new Error('useData debe usarse dentro del DataProvider');
    }
    return context;
};