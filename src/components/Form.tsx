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
    date: new Date().toISOString(),
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
        <main>
            <h2>{dataToEdit ? "Editar Tarea" : "Agregar "}</h2>
            <div>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="name"
                        placeholder="Escribe el nombre de la tarea"
                        onChange={handleChange}
                        value={form.name}
                        required
                    />
                    <input
                        type="text"
                        name="description"
                        placeholder="Escribe la descripción de la tarea"
                        onChange={handleChange}
                        value={form.description}
                        required
                    />
                    <label htmlFor="">Completada
                    <input 
                    type="checkbox" 
                    name="completed"
                    checked={form.completed}
                    onChange={handleChange}
                    />
                    </label>
                    <div>
                        <button type="submit">Enviar</button>
                        <button type="reset" onClick={handleReset}>Limpiar</button>
                    </div>
                </form>
            </div>
        </main>
    );
};

export default CreateForm;