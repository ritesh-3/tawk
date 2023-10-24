import { Link, Stack, Typography, useTheme } from '@mui/material'
import React from 'react'
import NoChat from './NoChat'

const NoConversation = () => {
    const theme = useTheme();
    return (
        <Stack
            spacing={2}
            sx={{ height: "100%", width: "100%" }}
            alignItems="center"
            justifyContent={"center"}
        >
            <NoChat />
            <Typography variant="subtitle2">
                Select a conversation or start a{" "}
                <Link
                    style={{
                        color: theme.palette.primary.main,
                        textDecoration: "none",
                    }}
                    to="/"
                >
                    new one
                </Link>

            </Typography>
        </Stack>
    )
}

export default NoConversation
