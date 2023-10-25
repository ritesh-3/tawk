import { Stack, Typography } from '@mui/material'
import React from 'react'

const NotFoundPage = () => {
    return (
        <Stack

            height="100vh"
            width='100vw'
            justifyContent='center'
            alignItems='center'
        >
            <Typography variant='h3'>
                404 ⚠️
            </Typography>
            <Typography variant='h5'>
                Page You are looking for does not exist... 😟
            </Typography>
        </Stack >
    )
}

export default NotFoundPage
