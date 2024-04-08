import { useField } from "formik";
import countries from "../../utils/countries";


const PersonalDataForm = () => {
    const [nameField, nameMeta] = useField('name');
    const [lastnameField, lastnameMeta] = useField('lastname');
    const [countryField, countryMeta] = useField('country');
    const [birthdateField, birthdateMeta] = useField('birthdate');
    const southernCountries = countries;

    return (
        <div className="felx flex-col item-start justify-start">
            <div className="form-control mb-4">
                <label className="block text-sm">Nombre</label>
                <input
                    type="text"
                    {...nameField}
                    className="w-full border border-blue-gray-200 rounded-md py-2 px-4"
                    placeholder="Juan Ramiro"
                    required
                />
                {nameMeta.error && nameMeta.touched && (
                    <div className="text-red">{nameMeta.error}</div>
                )}
            </div>
            <div className="form-control mb-4">
                <label className="block text-sm">Apellido</label>
                <input
                    type="text"
                    {...lastnameField}
                    className="w-full border border-blue-gray-200 rounded-md py-2 px-4"
                    placeholder="Perez"
                    required
                />
                {lastnameMeta.error && lastnameMeta.touched && (
                    <div className="text-red">{lastnameMeta.error}</div>
                )}
            </div>
            <div className="form-control mb-4">
                <label className="block text-sm">País</label>
                <select
                    {...countryField}
                    className="w-full border border-blue-gray-200 rounded-md py-2 px-4"
                    required
                >
                    <option value="">Selecciona un país</option>
                    {southernCountries.map((option, index) => (
                        <option key={index} value={option.name}>
                            {option.name}
                        </option>
                    ))}
                </select>
                {countryMeta.error && countryMeta.touched && (
                    <div className="text-red">{countryMeta.error}</div>
                )}
            </div>
            <div className="form-control mb-4">
                <label className="block text-sm">Fecha de Nacimiento</label>
                <input
                    type="date"
                    {...birthdateField}
                    className="w-full border border-blue-gray-200 rounded-md py-2 px-4"
                    required
                />
                {birthdateMeta.error && birthdateMeta.touched && (
                    <div className="text-red">{birthdateMeta.error}</div>
                )}
            </div>
        </div>
    )
}

export default PersonalDataForm;