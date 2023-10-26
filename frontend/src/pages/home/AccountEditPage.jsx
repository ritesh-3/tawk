import { Box, IconButton, Paper, Stack, Typography, useTheme } from '@mui/material'
import React from 'react'
import UpdateProfileForm from '../../components/auth/UpdateProfile'
import { ArrowLeft } from 'phosphor-react';
import useResponsive from '../../hooks/useResponsive';
import { useNavigate } from 'react-router-dom';

const AccountEditPage = () => {
    const theme = useTheme();
    const isDesktop = useResponsive("up", "md");
    const navigate = useNavigate();
    const handleGoBak = () => {
        navigate(-1);
    }
    return (
        <>
            {
                !isDesktop &&
                <IconButton color='primary' onClick={handleGoBak}>
                    <ArrowLeft />
                </IconButton>
            }
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
        </>
    )
}

export default AccountEditPage
