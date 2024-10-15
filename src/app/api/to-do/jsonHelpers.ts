import { promises as fs } from 'fs';
import { Task } from "../../../interfaces/taskInterfaces"; // Asegúrate que la ruta sea correcta
import path from 'path';

// Usamos process.cwd() para obtener la ruta del directorio raíz
const filePath = path.join(process.cwd(), 'data', 'tasks.json');

// Función para leer el archivo JSON
export async function readTasksFromFile(): Promise<Task[]> {
    try {
        const data = await fs.readFile(filePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error al leer el archivo:', error);
        return [];
    }
}

// Función para escribir en el archivo JSON
export async function writeTasksToFile(tasks: Task[]): Promise<void> {
    try {
        await fs.writeFile(filePath, JSON.stringify(tasks, null, 2), 'utf8');
    } catch (error) {
        console.error('Error al escribir en el archivo:', error);
    }
}
