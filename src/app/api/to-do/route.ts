import { NextResponse } from "next/server"; // nextResponse ayuda a responder en json
import { Task } from "../../../interfaces/taskInterfaces"
export const taskList: Task[] = [
    {
        id: 1,
        name: "Task 1",
        date: "2022-12-25",
        description: "This is the first task",
        completed: false,
    },
    {
        id: 2,
        name: "Task 2",
        date: "2022-12-25",
        description: "This is the second task",
        completed: true,
    },

];

export async function GET(req: Request){
    const url = new URL(req.url)
    console.log(url)
    const status = url.searchParams.get("status")

    let filterTask = taskList;
    if(!status) return NextResponse.json(filterTask)

    if(status === "completed"){
        filterTask = taskList.filter(task => task.completed)
    }else{
        filterTask = taskList.filter(task =>!task.completed)
    }
    return NextResponse.json(filterTask)
}

export async function POST(req: Request){

    const body = await req.json();

    if(!body) return NextResponse.json({
        message: "La tarea no es valida",        
    }, {status: 500})

    if(!body.name ||!body.date ||!body.description) return NextResponse.json({message: "Missing required fields"}, {status: 400})

    const newTask: Task = {
        id: Date.now(),
        completed: false,
        name: body.name,
        date: body.date,
        description: body.description,
    }

    taskList.push(newTask)
    return NextResponse.json(newTask)
}

