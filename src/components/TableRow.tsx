import React from "react";
import { TableRowTask } from "../interfaces/taskInterfaces"

const TableRow: React.FC<TableRowTask> = ({ task, setDataToEdit, deleteData }) => {
    const { id, name, date, description, completed } = task;


    return (
        <tr className="border-b hover:bg-gray-100 transition-colors">
            <td className="border border-gray-300 py-2 px-4">{name}</td>
            <td className="border border-gray-300 py-2 px-4">{date}</td>
            <td className="border border-gray-300 py-2 px-4">{description}</td>
            <td className="border border-gray-300 py-2 px-4">
                <span className={completed ? "text-green-600 font-semibold" : "text-red-600 font-semibold"}>
                    {completed ? "✔️" : "❌"}
                </span>
            </td>
            <td className="py-2 px-4 space-x-2">
                <button
                    className="text-blue-600 hover:text-blue-800 font-medium"
                    onClick={() => setDataToEdit(task)}
                >
                    Editar
                </button>
                <button
                    className="text-red-600 hover:text-red-800 font-medium"
                    onClick={() => deleteData(id)}
                >
                    Eliminar
                </button>
            </td>
        </tr>
    );
};

export default TableRow;