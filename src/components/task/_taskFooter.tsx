import React, { FC, ReactElement } from 'react'
import { Switch, Box, Button, FormControlLabel } from '@mui/material';
import { ITaskFooter } from './interfaces/ITaskFooter';
import { Status } from '../createTaskForm/enums/Status';

export const TaskFooter: FC<ITaskFooter> = (props): ReactElement => {
    const {
        id,
        status,
        onStatusChange = (e) => console.log(e),
        onClick = (e) => console.log(e) } = props

    return (<>
        <Box
            display='flex'
            justifyContent='space-between'
            alignItems='center'
            mt={4}
        >
            <FormControlLabel
                label='In Progress'
                control={
                    <Switch
                        color='warning'
                        onChange={(e) => onStatusChange(e, id)}
                        defaultChecked={status === Status.inProgress}
                    />}
            />
            <Button
                onClick={(e) => onClick(e, id)}
                variant='contained'
                color='success'
                size='small'
                sx={{ color: '#ffffff' }}
            >
                Mark Complete</Button>
        </Box></>)
}