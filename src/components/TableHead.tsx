import React from "react";


const TableHeader: React.FC = () => {
    return (
        <thead>
            <tr>
                <th>Name</th>
                <th>Date</th>
                <th>Description</th>
                <th>Status</th>
                <th>Actions</th>
            </tr>
        </thead>
    );
};

export default TableHeader;