import React, { FC, ReactElement } from "react";
import { Grid } from '@mui/material'
import { TaskArea } from "../taskArea/taskArea";
import { Sidebar } from '../components/sidebar/sidebar';

export const Dashboard: FC = (): ReactElement => {
    return (
        <Grid container minHeight="80vh" p={0} m={0}>
            <TaskArea />
            <Sidebar />
        </Grid>
    )

}