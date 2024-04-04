import { useNavigate } from "react-router-dom";
import ImageSuccess from "../../assets/images/image-success.png";

const TransferSuccess = () => {
    const navigate = useNavigate();
    return (
        <div className="flex flex-col justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
            <div className="relative bg-white rounded-lg shadow">
                <button
                    type="button"
                    className="absolute top-3 end-2.5 text-black hover:bg-gray2  rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                    onClick={() => navigate('/home', { replace: true })}
                >
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                    </svg>
                </button>
                <div className="p-8 text-center">
                    <img src={ImageSuccess} alt="Success" className="mx-auto mb-4" />
                    <h3 className="mb-5 text-md font-normal text-black">
                        El destinatario recibirá el dinero en 30 minutos
                    </h3>
                    <button
                        type="button"
                        onClick={() => navigate('/home', { replace: true })}
                        className="py-2.5 px-5 ms-3 text-sm font-medium text-black hover:bg-gray2  focus:outline-none bg-white rounded-lg border border-gray-200 focus:z-10 focus:ring-4 focus:ring-gray-100"
                    >
                        Ir al inicio
                    </button>
                </div>
            </div>
        </div>
    )
}

export default TransferSuccess;