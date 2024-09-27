'use client'
import { useState } from "react"
import { InputFormProps } from "./types"

const initialValue: InputFormProps = {
    name: '',
    description: '',
    id: '',
    other: ''
}

const MultiInputForm: React.FC = () => {
    const [formData, setFormData] = useState<InputFormProps>(initialValue);
    const [submittedData, setSubmittedData] = useState<InputFormProps[]>([]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmittedData([...submittedData, formData]);
        setFormData(initialValue);
    }

    return (
        <div className="container p-5">
            <form onSubmit={handleSubmit}>
                {
                    Object.keys(formData).map((key) => (
                        <input
                            key={key}
                            name={key}
                            placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                            value={formData[key as keyof InputFormProps]}
                            onChange={handleChange}
                            className="block border-2 py-1 px-2 border-grey rounded mb-2"
                        />
                    ))
                }
                <button 
                    className="block bg-green-300 py-1 px-2 rounded mb-2"
                    type="submit"
                >
                    Submit
                </button>
            </form>
            <ul>
                {
                    submittedData.map((data: InputFormProps, index: number) => (
                        <li key={index}>
                            {JSON.stringify(data)}
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default MultiInputForm;