import React from 'react';
import { useNavigate } from 'react-router-dom';

interface HelpProps {
    dataState?: any;
}

const HelpPage = (props: HelpProps) => {
    const { dataState } = props;
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center mt-[10%]">
            <h1 className="text-6xl p-5 text-black">Ooops! Llegaste al Ayudas</h1>
            <h2 className="text-2xl p-5 text-black">404 Página no encontrada</h2>
            <p className="text-black">La página que buscas se encuentra en construcción</p>
            <button
                className="mt-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => navigate('/home', { replace: true })}
            >
                Ir a la página principal
            </button>
        </div>
    );
};

export default HelpPage;