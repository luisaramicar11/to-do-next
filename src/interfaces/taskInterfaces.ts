export interface Task {
    id: number;
    name: string;
    date: string;
    description: string;
    completed: boolean;
}

export interface TableRowTask {
    task: Task,
    setDataToEdit: (task: Task | null) => void;
    deleteData: (id: number) => void;
}

export interface TableData {
    data : Task[],
    setDataToEdit: (task: Task | null) => void;
    deleteData: (id: number) => void;
}