import { Paper, Stack, Typography, useTheme } from '@mui/material'
import React from 'react'
import UpdateProfileForm from '../../components/auth/UpdateProfile'

const AccountEditPage = () => {
    const theme = useTheme();
    return (
        <Stack
            sx={{
                height: '100%',
                width: '100%',
            }}
            justifyContent={'center'}
            alignItems={'center'}
        >
            <Paper
                elevation={2}
                sx={{
                    p: 2,
                    backgroundColor:
                        theme.palette.mode === "light"
                            ? "#F0F4FA"
                            : theme.palette.background.paper,
                }}
            >


                <UpdateProfileForm />
            </Paper>
        </Stack>
    )
}

export default AccountEditPage
