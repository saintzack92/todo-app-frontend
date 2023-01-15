import React, { FC, ReactElement } from 'react'
import { Box } from '@mui/material'
import { TaskHeader } from './_taskHeader'
import { TaskDescription } from './_taskDescription'
import { TaskFooter } from './_taskFooter'
import { ITask } from './interfaces/ITask'
import { Priority } from '../createTaskForm/enums/Priority'
// import { Status } from '../createTaskForm/enums/Status'
import { renderPriorityBorderColor } from './helpers/renderPriorityBorderColor'
import { Status } from '../createTaskForm/enums/Status'

export const Task: FC<ITask> = (props): ReactElement => {
    const {
        id,
        title = 'Test Title',
        date= new Date(), 
        description='lorem ipsom dolor sit amet',
        onStatusChange=((e)=>console.log(e)),
        onClick=((e)=>console.log(e)),
        priority= Priority.low,
        status=Status.completed
    } = props

    return (
        <Box
            display='flex'
            width='100%'
            justifyContent='flex-start'
            flexDirection='column'
            mb={4}
            p={2}
            sx={{
                width: '100%',
                backgroundColor: 'background.paper',
                borderRadius: '8px',
                border: '1px solid',
                borderColor: renderPriorityBorderColor(priority)

            }}
        >
            <TaskHeader title={title} date={date}/>
            <TaskDescription description={description}/>
            <TaskFooter 
            id={id}
            status={status}
            onClick={onClick} 
            onStatusChange={onStatusChange}/>

        </Box>
    )
}