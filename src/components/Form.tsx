import React, { FormEvent, MouseEvent, useState, useEffect } from 'react';
import { Task } from "../interfaces/taskInterfaces";

interface CreateFormProps {
    createData: (task: Task) => void;
    updateData: (task: Task) => void;
    dataToEdit: Task | null;
    setDataToEdit: (data: Task | null) => void;
}

const initialForm: Task = {
    id: 0,
    name: "",
    date: new Date().toLocaleDateString('es-ES'),
    description: "",
    completed: false
};

const CreateForm: React.FC<CreateFormProps> = ({ createData, updateData, dataToEdit, setDataToEdit }) => {
    const [form, setForm] = useState<Task>(initialForm);

    useEffect(() => {
        if (dataToEdit) {
            setForm(dataToEdit);
        } else {
            setForm(initialForm);
        }
    }, [dataToEdit]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setForm(prevForm => ({
            ...prevForm,
            [name]: type === "checkbox" ? checked : value
        }));
    };


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!form.id) {
            form.id = Date.now();
            createData(form);
        } else {
            updateData(form);
        }
        handleReset(e);
    };

    const handleReset = (e: FormEvent<HTMLFormElement> | MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setForm(initialForm);
        setDataToEdit(null);
    };


    return (
        <main className="flex justify-center items-center p-4">
    <div className="bg-white rounded p-8 w-1/2">
        <h2 className="text-2xl text-center font-bold mb-4">{dataToEdit ? "Editar Tarea" : "Agregar Tarea"}</h2>
        <form onSubmit={handleSubmit}>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                    Nombre
                </label>
                <input
                    type="text"
                    name="name"
                    placeholder="Escribe el nombre de la tarea"
                    onChange={handleChange}
                    value={form.name}
                    required
                    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                    Descripción
                </label>
                <input
                    type="text"
                    name="description"
                    placeholder="Escribe la descripción de la tarea"
                    onChange={handleChange}
                    value={form.description}
                    required
                    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
            </div>
            <div className="mb-4 flex items-center">
                <label className="mr-2 text-gray-700 text-sm font-bold" htmlFor="completed">
                    Completada
                </label>
                <input 
                    type="checkbox" 
                    name="completed"
                    checked={form.completed}
                    onChange={handleChange}
                    className="form-checkbox h-5 w-5 text-blue-600"
                />
            </div>
            <div className="flex justify-between">
                <button 
                    type="submit" 
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    Enviar
                </button>
                <button 
                    type="button" 
                    onClick={handleReset}
                    className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    Limpiar
                </button>
            </div>
        </form>
    </div>
</main>

    );
};

export default CreateForm;