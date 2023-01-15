import { Priority } from "../../components/createTaskForm/enums/Priority"
import { Status } from "../../components/createTaskForm/enums/Status"

export interface ITaskApi{
    id: string
    date: string
    title: string
    description: string
    priority: `${Priority}`
    status: `${Status}`
}