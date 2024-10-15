"use client";
import TableRow from "./TableRow";
import { TableData } from "../interfaces/taskInterfaces";
import TableHeader from "./TableHead"

const Table: React.FC<TableData> = ({ data, setDataToEdit, deleteData }) => {
    return (
        <div>
            <h1>Tasks</h1>
            <table>
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
                            <td colSpan={5}>Sin datos</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>


    )
};

export default Table;