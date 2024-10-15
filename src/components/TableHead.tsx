import React from "react";

const TableHeader: React.FC = () => {
    return (
        <thead className="">
            <tr className="text-center text-sm font-semibold text-gray-700">
                <th className="border border-gray-300 px-4 py-2">Nombre</th>
                <th className="border border-gray-300 px-4 py-2">Fecha</th>
                <th className="border border-gray-300 px-4 py-2">Descripción</th>
                <th className="border border-gray-300 px-4 py-2">Estado</th>
                <th className="border border-gray-300 px-4 py-2">Acciones</th>
            </tr>
        </thead>
    );
};

export default TableHeader;
