import React, { FC, ReactElement, useEffect, useState, useContext } from "react";
import { Box, Typography, Stack, LinearProgress, Button, Alert, AlertTitle } from '@mui/material'
import { TaskTitleField } from "./_taskTitleField";
import { TaskDescriptionField } from "./_taskDescriptionField";
import { TaskDateField } from "./_taskDateField";
import { TaskSelectField } from "./_taskSelectField";
import { Status } from "./enums/Status";
import { Priority } from "./enums/Priority";
import { useMutation } from "react-query";
import { sendApiRequest } from "../../helpers/sendApiRequest";
import { ICreateTask } from "../../taskArea/interface/ICreateTask";
import { TaskStatusChangedContext } from "../../context";

export const CreateTaskForm: FC = (): ReactElement => {
    //declare component states
    const [title, setTitle] = useState<string | undefined>(
        undefined
    )
    const [description, setDescription] = useState<string | undefined>(

    )
    const [date, setDate] = useState<Date | null>(
        new Date()
    )
    const [status, setStatus] = useState<string>(Status.todo)
    const [priority, setPriority] = useState<string>(Priority.normal)
    const [showSuccess, setShowSuccess] = useState<boolean>(false)

    const taskUpdatedContext = useContext(
        TaskStatusChangedContext,
    )

    //create task mutation
    const createTaskMutation = useMutation((data: ICreateTask) => sendApiRequest(
        'http://localhost:3201/tasks',
        'POST',
        data,
    ))

    function createTaskHandler() {
        if (!title || !date || !description) {
            return
        }
        const task: ICreateTask = {
            title,
            description,
            date: date.toString(),
            status,
            priority,
        }
        createTaskMutation.mutate(task)
    }
/*
   * Manage Side Effects inside the application
   */
    useEffect(() => {

        if (createTaskMutation.isSuccess) {
            setShowSuccess(true);
            taskUpdatedContext.toggle()
        }

        const successTimeout = setTimeout(() => {
            setShowSuccess(false);
        }, 7000);

        return () => {
            clearTimeout(successTimeout);
        };
    }, [createTaskMutation.isSuccess, taskUpdatedContext])

    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="flex-start"
            width="100%"
            px={4}
            my={6}
        >

            {showSuccess && <Alert
                severity="success"
                sx={{ width: '100%', marginBottom: '16px' }}
            >
                <AlertTitle>Success</AlertTitle>
                The task has been created successfully
            </Alert>}

            <Typography
                mb={2}
                component='h2'
                variant='h6'
            >Create A Task</Typography>
            <Stack sx={{ width: '100%' }} spacing={2}>
                <TaskTitleField
                    onChange={(e) => setTitle(e.target.value)}
                    disabled={createTaskMutation.isLoading}
                />
                <TaskDescriptionField
                    onChange={(e) => setDescription(e.target.value)}
                    disabled={createTaskMutation.isLoading}
                />
                <TaskDateField
                    value={date}
                    onChange={(date) => setDate(date)}
                    disabled={createTaskMutation.isLoading}
                />
                <Stack
                    sx={{ width: '100%' }} spacing={2} direction='row'
                >
                    <TaskSelectField
                        label='Status'
                        name='status'
                        value={status}
                        onChange={(e) => { setStatus(e.target.value as string) }}
                        disabled={createTaskMutation.isLoading}
                        items={[
                            {
                                value: Status.todo,
                                label: Status.todo.toUpperCase()
                            },
                            {
                                value: Status.inProgress,
                                label: Status.inProgress.toUpperCase()
                            },
                            {
                                value: Status.completed,
                                label: Status.completed.toUpperCase()
                            },
                        ]} />
                    <TaskSelectField
                        label='Priority'
                        name='priority'
                        value={priority}
                        onChange={(e) => { setPriority(e.target.value as string) }}
                        disabled={createTaskMutation.isLoading}
                        items={[
                            {
                                value: Priority.high,
                                label: Priority.high.toUpperCase()
                            },
                            {
                                value: Priority.normal,
                                label: Priority.normal.toUpperCase()
                            },
                            {
                                value: Priority.low,
                                label: Priority.low.toUpperCase()
                            },
                        ]} />
                </Stack>
                {createTaskMutation.isLoading && <LinearProgress />}

                <Button
                    disabled={
                        !title ||
                        !description ||
                        !date ||
                        !status ||
                        !priority
                    }
                    variant="contained"
                    size="large"
                    fullWidth
                    onClick={createTaskHandler}>Create A Task</Button>
            </Stack>
        </Box>
    )
}