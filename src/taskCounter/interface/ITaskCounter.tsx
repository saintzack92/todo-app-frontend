import { Status } from "../../components/createTaskForm/enums/Status"

export type TaskCounterStatusType= 
Status.todo | 
Status.inProgress |
Status.completed

export interface ITaskCounter{
    count?: number;
    status?: TaskCounterStatusType;
}