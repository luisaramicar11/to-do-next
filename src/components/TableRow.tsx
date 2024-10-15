import React from "react";
import { TableRowTask } from "../interfaces/taskInterfaces"

const TableRow: React.FC<TableRowTask> = ({ task, setDataToEdit, deleteData }) => {
    const { id, name, date, description, completed } = task;


    return (
        <tr>
            <td>{name}</td>
            <td>{date}</td>
            <td>{description}</td>
            <td>{completed}</td>
            <td>
                <button onClick={() => setDataToEdit(task)}>Editar</button>
                <button onClick={() => deleteData(id)}>Eliminar</button>
            </td>
        </tr>
    );
};

export default TableRow;