"use client";

import React, { useEffect, useState } from "react";
import { Task } from "../interfaces/taskInterfaces";
import CreateForm from "../components/Form";
import Table from "../components/Table";
import { toast } from "react-toastify";


interface EditedTaskState {
    task: Task;
}

const TasksCrud: React.FC = () => {
    const [task, setTask] = useState<Task[]>([]);
    const [loadingTask, setLoadingTask] = useState(true);
    const [editedTask, setEditedTask] = useState<EditedTaskState | null>(null);
    console.log(loadingTask)
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


    const handleCreateTask = async (newTask: Task) => {
        try {
            const taskToSend = {
                name: newTask.name,
                date: newTask.date,
                description: newTask.description,
                completed: newTask.completed
            };
    
            console.log('Tarea a enviar:', taskToSend);
    
            // Hacer la solicitud al API
            const response = await fetch('/api/to-do', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(taskToSend),
            });
    
            const responseData = await response.json();
    
            // Acceder a la tarea creada dentro de responseData.data
            if (response.status === 200 && responseData.data) {
                const createdTask: Task = responseData.data; // Acceder a `data`
                setTask(prev => [...prev, createdTask]); // Agregar la nueva tarea al estado
                toast.success("Tarea creada exitosamente!");
            } else {
                toast.error(`Error al crear la tarea: ${responseData.message || 'Error desconocido'}`);
            }
        } catch (error: unknown) {
            console.error('Error al enviar la tarea:', error);
            toast.error("Error al crear la tarea.");
        }
    };
    

    const handleUpdateTask = async (updatedTask: Task) => {

        try {
            const taskToUpdate = {
                name: updatedTask.name,
                date: updatedTask.date,
                description: updatedTask.description,
                completed: updatedTask.completed
            };

            console.log(taskToUpdate)
            const response = await fetch(`/api/to-do/${updatedTask.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(taskToUpdate),
            });

            const responseData = await response.json();
            console.log(responseData)

            if (responseData.status === 200 && responseData.data) {
                const updatedTaskData: Task = responseData.data; // Ajuste para usar la propiedad data
                setTask((prev) =>
                    prev.map((task) => (task.id === updatedTaskData.id ? updatedTaskData : task))
                );
                toast.success("Tarea actualizada exitosamente!");
                setEditedTask(null);
            }
        } catch (error) {
            console.error("Error al actualizar la tarea:", error);
            toast.error("Error al actualizar la tarea.");
        }
    };

    const handleDeleteTask = async (taskId: number) => {
        const isConfirmed = confirm("¿Estás seguro de que deseas eliminar esta tarea?");
    
    if (!isConfirmed) {
        return;
    }

        try {
            const response = await fetch(`/api/to-do/${taskId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const responseData = await response.json(); 

            if (response.status === 200) {
                setTask((prev) => prev.filter((task) => task.id !== taskId));
                toast.success("Tarea eliminada exitosamente!");
            } else {
                console.error("Error al eliminar la tarea", responseData);
                toast.error("Error al eliminar la tarea");
            }
        } catch (error) {
            console.error("Error al eliminar la tarea:", error);
            toast.error("Error al eliminar la tarea.");
        }
    };

    return (
        <>
            <CreateForm
                createData={handleCreateTask}
                updateData={handleUpdateTask}
                dataToEdit={editedTask?.task || null}
                setDataToEdit={(task: Task | null) =>
                    setEditedTask(task ? { task } : null)
                }
            />
            <Table
                data={task}
                setDataToEdit={(task: Task | null) =>
                    setEditedTask(task ? { task } : null)
                }
                deleteData={handleDeleteTask}
            />
        </>
    );
};



export default TasksCrud;