"use client";

import React, { useEffect, useState } from "react";
import { Task } from "../interfaces/taskInterfaces";
import Table from "../components/Table";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const TasksCrud: React.FC = () => {
    const [task, setTask] = useState<Task[]>([]);
    const [loadingTask, setLoadingTask] = useState(true);
    console.log(loadingTask)
    const router = useRouter();
    useEffect(() => {
        const fetchTasks = async () => {

            try {
                const response = await fetch('/api/to-do', {
                    method: 'GET',
                    headers: {
                        "accept": "*/*",
                    },
                });

                const responseData = await response.json();

                if (response.status === 200) {
                    const data: Task[] = responseData.data;
                    setTask(data);
                } else {
                    console.error('Error al obtener las tareas:', responseData);
                    toast.error(`Error al obtener las tareas: ${responseData.error || 'Error desconocido'}`);
                }
            } catch (error) {
                console.error('Error de la API al obtener las tareas:', error);
                toast.error('Error al obtener las tareas');
            } finally {
                setLoadingTask(false);
            }
        };

        fetchTasks();
    }, []);


    const handleTask = async () => {
      router.push("/tasks");
    };

    return (
        <>
            <Table
                data={task}
                setDataToEdit={handleTask}
                deleteData={handleTask}
            />
        </>
    );
};



export default TasksCrud;
