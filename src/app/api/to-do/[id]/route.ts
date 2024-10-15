import { NextResponse } from "next/server";
import { taskList } from "../route";
import { Task} from "../../../../interfaces/taskInterfaces"

export async function PUT(request: Request, {params}: { params: { id: string}}){
    const body = await request.json();

    if(!body) return NextResponse.json({message: "La tarea no es valida"}, {status: 500})

    const taskId = parseInt(params.id)
    const taskIndex = taskList.findIndex((task) => task.id === taskId)

    if(taskIndex === -1) return NextResponse.json({message: "Task not found"}, {status: 404})

        const updatedTask: Task = {
            id: taskList[taskIndex].id,
            completed: body.completed?? taskList[taskIndex].completed,
            name: body.name?? taskList[taskIndex].name,
            date: body.date?? taskList[taskIndex].date,
            description: body.description?? taskList[taskIndex].description,
        }

    taskList[taskIndex]= updatedTask  

    return NextResponse.json({message: "Task updated"}, {status: 200});
}

export async function DELETE(request: Request, {params}: { params: { id: string}}){
    const taskId = parseInt(params.id);
    const taskIndex = taskList.findIndex((task)=> task.id === taskId);

    if(taskIndex === -1){
        return NextResponse.json({message: "Task not found"}, {status: 404});
    }

    taskList.splice(taskIndex, 1);
    return NextResponse.json({message: "Task deleted"}, {status: 200});
};