import { NextResponse } from "next/server";
import { readTasksFromFile, writeTasksToFile } from '../jsonHelpers'; 
import { Task} from "../../../../interfaces/taskInterfaces"

export async function PUT(request: Request, {params}: { params: { id: string}}){
    const body = await request.json();

    if(!body) return NextResponse.json({message: "La tarea no es valida", status: 500})

    const taskId = parseInt(params.id)
    const tasks = await readTasksFromFile();
    const taskIndex = tasks.findIndex((task) => task.id === taskId)

    if(taskIndex === -1) return NextResponse.json({message: "Task not found", status: 404})

        const updatedTask: Task = {
            id: tasks[taskIndex].id,
            completed: body.completed?? tasks[taskIndex].completed,
            name: body.name?? tasks[taskIndex].name,
            date: body.date?? tasks[taskIndex].date,
            description: body.description?? tasks[taskIndex].description,
        }

    tasks[taskIndex]= updatedTask  
    await writeTasksToFile(tasks);
    return NextResponse.json({message: "Task updated", status: 200, data: updatedTask});
}

export async function DELETE(request: Request, {params}: { params: { id: string}}){
    const taskId = parseInt(params.id);
    const tasks = await readTasksFromFile();
    const taskIndex = tasks.findIndex((task)=> task.id === taskId);

    if(taskIndex === -1){
        return NextResponse.json({message: "Task not found"}, {status: 404});
    }

    tasks.splice(taskIndex, 1);
    await writeTasksToFile(tasks); 
    return NextResponse.json({message: "Task deleted", status: 200});
};