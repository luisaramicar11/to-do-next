"use client";
import TableRow from "./TableRow";
import { TableData } from "../interfaces/taskInterfaces";
import TableHeader from "./TableHead"

const Table: React.FC<TableData> = ({ data, setDataToEdit, deleteData }) => {
    console.log(data)
    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4 text-center p-3">Tareas</h1>
            <table className="min-w-full border border-gray-300 rounded-md">
                <TableHeader />
                <tbody>
                    {data.length > 0 ? (
                        data.map((task) => (
                            <TableRow
                                key={task.id}
                                task={task}
                                setDataToEdit={setDataToEdit}
                                deleteData={deleteData}
                            />
                        ))
                    ) : (
                        <tr>
                            <td colSpan={5} className="text-center p-4">
                                Sin datos
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Table;