import { NextResponse } from "next/server"; // nextResponse ayuda a responder en json
import { readTasksFromFile, writeTasksToFile } from './jsonHelpers';
import { Task } from "../../../interfaces/taskInterfaces"


export async function GET(req: Request){
    const tasks = await readTasksFromFile()
    //const url = new URL(req.url)
    //const status = url.searchParams.get("status")

    //let filterTask = taskList;
    /* if(!status) return NextResponse.json(filterTask)

    if(status === "completed"){
        filterTask = taskList.filter(task => task.completed)
    }else{
        filterTask = taskList.filter(task =>!task.completed)
    } */
    //console.log(filterTask)
    return NextResponse.json({data: tasks, status: 200})
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

    const tasks = await readTasksFromFile(); 
    tasks.push(newTask)
    await writeTasksToFile(tasks)
    return NextResponse.json({data: newTask, status: 201})
}

