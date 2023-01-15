import { Priority } from "../../createTaskForm/enums/Priority";

export const renderPriorityBorderColor = (
    priority: string
): string =>{
    if (priority === Priority.normal){
        return 'info.900'
    }else if( priority === Priority.normal){
        return 'grey.light'
    }else if( priority === Priority.high){
        return 'error.light'
    }else{ return'grey.900'}

}