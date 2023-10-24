import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { getUserDetailsById } from '../../redux/slices/userSlice';
import { getAllMessages } from '../../redux/slices/inbox';
import ChatHeader from './ChatHeader';
import { Box, Stack, useTheme } from '@mui/material';
import useResponsive from '../../hooks/useResponsive';
import Messages from './Messages';
import ChatFooter from './ChatFooter';

const Conversation = ({ socket }) => {
    const { userId, chatId } = useParams();
    const { otherUser, user } = useSelector((state) => state.user);
    const { messages, messagesLoading } = useSelector((state) => state.inbox);
    const dispacth = useDispatch();
    const isDesktop = useResponsive("up", "md");
    const theme = useTheme();
    const [online, setOnline] = useState(false);

    useEffect(() => {
        dispacth(getUserDetailsById(userId))
        dispacth(getAllMessages(chatId))

        //adding user in active users list at backend
        socket.emit("addUser", user._id);
        socket.on("getUsers", users => {
            // console.log(users);
            setOnline(users.some((u) => u.userId === userId));
        })
    }, [userId, chatId])

    return (
        <Stack
            height={"100%"}
            maxHeight={"100vh"}
            width={!isDesktop ? "100vw" : "100%"}
        >
            {otherUser &&
                <ChatHeader online={online} user={otherUser} />
            }
            <Box
                // ref={messageListRef}
                width={"100%"}
                sx={{
                    position: "relative",
                    flexGrow: 1,
                    overflowY: "scroll",
                    backgroundColor:
                        theme.palette.mode === "light"
                            ? "#F0F4FA"
                            : theme.palette.background,

                    boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
                }}
            >
                {
                    messagesLoading ? <>
                        <Stack sx={{ width: '100%', height: '100%' }}
                            alignItems={'center'}
                            justifyContent={'center'}
                        >
                            Loading...
                        </Stack>
                    </> :
                        <Messages otherUser={otherUser} user={user} messages={messages} />
                }
            </Box>
            <ChatFooter socket={socket} />
        </Stack>
    )
}

export default Conversation
