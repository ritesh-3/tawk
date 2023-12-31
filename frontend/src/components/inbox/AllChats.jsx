import React, { useEffect, useState } from 'react'
import useResponsive from '../../hooks/useResponsive';
import { Box, Divider, Stack, TextField, Typography, styled, useTheme } from '@mui/material';
import {
    ArchiveBox,
    ArrowClockwise,
    Chats,
    CircleDashed,
    MagnifyingGlass,
    Users,
} from "phosphor-react";
import { useSelector } from 'react-redux';
import ChatElement from './ChatElement';
import ChatLoader from '../loader/ChatLoader';

const StyledInput = styled(TextField)(({ theme }) => ({
    "& .MuiInputBase-input": {
        paddingTop: "8px !important",
        paddingBottom: "8px !important",
    },
}));

const AllChats = () => {
    const isDesktop = useResponsive("up", "md");
    const [searchQuery, setSearchQuery] = useState('')
    const [filteredChats, setfilteredChats] = useState([]);
    const { chats, chatsLoading } = useSelector(state => state.inbox)
    const theme = useTheme();

    useEffect(() => {
        // Filter chats based on searchQuery
        const filteredChats = chats.filter((chat) => {
            const usernames = chat.users.map((user) => user.username);
            return usernames.some((username) =>
                username.toLowerCase().includes(searchQuery.toLowerCase())
            );
        });
        setfilteredChats(filteredChats);
    }, [searchQuery, chats]);

    return (
        <Box
            sx={{
                position: "relative",
                height: "100%",
                width: isDesktop ? 420 : "100vw",
                backgroundColor:
                    theme.palette.mode === "light"
                        ? "#F8FAFF"
                        : theme.palette.background.default,

                boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
            }}
        >
            <Stack p={3} spacing={2} sx={{ height: "100vh" }}>
                <Stack
                    alignItems={"center"}
                    justifyContent="space-between"
                    direction="row"
                >
                    <Typography variant="h5">Chats</Typography>

                </Stack>
                <StyledInput
                    value={searchQuery}
                    onChange={(event) => {
                        setSearchQuery(event.target.value);
                    }}
                    fullWidth
                    placeholder="Search..."
                    variant="outlined"
                />
                <Stack spacing={1}>

                    <Divider />
                </Stack>
                <Stack sx={{ flexGrow: 1, overflowY: "scroll", height: "100%" }}>

                    <Stack spacing={2.4}>
                        <Typography variant="subtitle2" sx={{ color: "#676667" }}>
                            All Chats
                        </Typography>
                        {chatsLoading ? <>
                            {Array(5).fill("").map((el, i) => (
                                <ChatLoader key={i} chatsLoading />
                            ))}
                        </> :

                            <>
                                {filteredChats.length > 0 && filteredChats.map((el, idx) => {
                                    return <ChatElement {...el} key={idx} />;
                                })}
                            </>
                        }

                    </Stack>
                </Stack>
            </Stack>
        </Box>
    )
}

export default AllChats
