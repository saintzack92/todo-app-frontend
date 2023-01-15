import { Status } from "../../components/createTaskForm/enums/Status";
import { TaskCounterStatusType } from "../interface/ITaskCounter";

export const emitCorrectLabel = (status:TaskCounterStatusType):string=>{
    if(status === Status.todo){
        return `To do`
    }else if (status===Status.inProgress){
        return `In Progress`
    }else if (status=== Status.completed){
        return `completed`
    }else{
        return `undeafined label`
    }
}