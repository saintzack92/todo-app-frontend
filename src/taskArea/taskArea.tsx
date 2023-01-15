import React, { FC, ReactElement, useContext, useEffect } from "react";
import { Grid, Box, Alert, LinearProgress } from '@mui/material'
import { format } from "date-fns";
import { TaskCounter } from "../taskCounter/taskCounter";
import { Task } from "../components/task/task";
import { useMutation, useQuery } from "react-query";
import { sendApiRequest } from "../helpers/sendApiRequest";
import { ITaskApi } from "./interface/ITaskApi";
import { Status } from "../components/createTaskForm/enums/Status";
import { IUpdateTask } from "../components/createTaskForm/interfaces/IUpdateTask";
import { countTask } from "./helpers/counTask";
import { TaskStatusChangedContext } from "../context";

export const TaskArea: FC = (): ReactElement => {

    const taskUpdatedContext = useContext(
        TaskStatusChangedContext
    )

    const { error, isLoading, data, refetch } = useQuery(
        'tasks', async () => {
            return await sendApiRequest<ITaskApi[]>(
                'http://localhost:3201/tasks',
                'GET',
            )
        }
    )
    //update task mutation - click switch to update to database
    const updateTaskMutation = useMutation(
        (data: IUpdateTask) => sendApiRequest(
            'http://localhost:3201/tasks',
            'PUT',
            data,
        ),
    )

    useEffect(() => {
        refetch()
    }, [refetch, taskUpdatedContext.updated])

    useEffect(() => {
        if (updateTaskMutation.isSuccess) {
          taskUpdatedContext.toggle();
        }
      }, [taskUpdatedContext, updateTaskMutation.isSuccess]);

    function onStatusChangeHandler(
        e: React.ChangeEvent<HTMLInputElement>,
        id: string,
    ) {
        updateTaskMutation.mutate({
            id,
            status: e.target.checked ? Status.inProgress : Status.todo
        })
    }

    //klik mark complete to complete the task
    function markCompleteHandler(
        e: |React.MouseEvent<HTMLButtonElement> 
            |React.MouseEvent<HTMLAnchorElement>,
        id: string
    ) {
        updateTaskMutation.mutate({
            id,
            status: Status.completed
        })
    }

    return (
        <Grid item md={8} px={4}>
            <Box mb={8} px={4}>
                <h2>Status of your task as on {format(new Date(), 'PPPP')}</h2>
            </Box>
            <Grid
                container
                display='flex'
                justifyContent='center'
            >
                <Grid
                    item
                    display='flex'
                    flexDirection='row'
                    justifyContent='space-around'
                    alignItems='center'
                    md={10}
                    xs={12}
                    mb={8}
                >

                    <TaskCounter
                        count={data ? countTask(data, Status.todo) : undefined}
                        status={Status.todo} />
                    <TaskCounter
                        count={data ? countTask(data, Status.inProgress) : undefined}
                        status={Status.inProgress} />
                    <TaskCounter
                        count={data ? countTask(data, Status.completed) : undefined}
                        status={Status.completed} />
                </Grid>
                <Grid
                    item
                    display='flex'
                    flexDirection='column'
                    md={8}
                    xs={10}
                >
                    <>
                        {error && (
                            <Alert severity="error"> there was an error to fetching your api and tasks</Alert>
                        )}

                        {!error && Array.isArray(data) && data.length === 0 && (
                            <Alert severity="warning">you dont have any task cvreated yet., start by creating ones</Alert>
                        )}

                        {isLoading ? (<LinearProgress />) : (
                            Array.isArray(data) &&
                            data.length > 0 &&
                            data.map((each, index) => {
                                return each.status === Status.todo || Status.inProgress ? (
                                    <Task
                                        key={index + each.priority}
                                        id={each.id}
                                        title={each.title}
                                        date={new Date(each.date)}
                                        description={each.description}
                                        priority={each.priority}
                                        status={each.status}
                                        onStatusChange={onStatusChangeHandler}
                                        onClick={markCompleteHandler}
                                    />) : (false)
                            })
                        )}
                    </>
                </Grid>
            </Grid>

        </Grid>
    )
}
