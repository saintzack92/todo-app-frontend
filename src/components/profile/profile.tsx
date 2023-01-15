import React, { FC, ReactElement } from "react";
import { Avatar, Box, Typography } from '@mui/material';


interface IProfile{
    name?:string
    lastname?: string
}
export const Profile: FC<IProfile> = (props):ReactElement => {
    
    const {name ='Abdullah' , lastname='Chaniago'} = props
    return (
        <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems='center'
        >
            <Avatar
                sx={{
                    width: '96px',
                    height: '96px',
                    backgroundColor: 'primary.main',
                    marginBottom: '16px'

                }}
            >   
                <Typography variant='h4' color='text.primary'>
                    {/* {`${ name.split(' ').map((word:string) => word.charAt(0)).join('')}`} */}
                    {`${ name.substring(0,1) + lastname.substring(0,1)}`}
                </Typography>
            </Avatar>
            <Typography variant='h6' color='text.primary'>
                {`Welcome, ${name} ${lastname}`}
            </Typography>
            <Typography variant='body1' color='text.primary'>
                This is your personal task manager
            </Typography>
        </Box>
    )
}