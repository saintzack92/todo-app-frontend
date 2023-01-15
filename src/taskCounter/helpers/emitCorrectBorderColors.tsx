import { Status } from "../../components/createTaskForm/enums/Status";
import { TaskCounterStatusType } from "../interface/ITaskCounter";

export const emitCorrectBorderColor =(status: TaskCounterStatusType,):string=>{
    // switch(status){
    //     case Status.todo:
    //         return 'error.light'
    //     case Status.inProgres:
    //         return 'error.light'
    //     case Status.completed:
    //         return 'error.light'
    // }
    if (status === Status.todo){
        return 'error.light'
    }else if (status=== Status.inProgress){
        return 'warning.light'
    }else if(status === Status.completed){
        return 'success.light'
    }else{
        return 'undefined'
    }
    
}