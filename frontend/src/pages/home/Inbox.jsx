import { Stack } from '@mui/material'
import useResponsive from '../../hooks/useResponsive'
import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import inbox, { getAllChats, inboxSlice } from '../../redux/slices/inbox';
import AllChats from '../../components/inbox/AllChats';
import { useParams } from 'react-router-dom';
import NoConversation from '../../components/inbox/NoConversation';
import { useState } from 'react';
import Conversation from '../../components/inbox/Conversation';
import { io } from 'socket.io-client';
import { BASE_URL } from '../../constants/constants';



const Inbox = () => {
    const isDesktop = useResponsive("up", "md");
    const params = useParams();
    const socket = useRef(null);
    const { user } = useSelector(state => state.user)
    // const theme = useTheme();
    const { userId, chatId } = params;

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllChats())
        if (!socket?.current) {
            socket.current = io(import.meta.env.VITE_SOCKET_URL || BASE_URL);
        }

        socket.current.on("getMessage", (data) => {
            if (data && data.senderId === userId) {
                const newMsg = {
                    sender: data.senderId,
                    content: data.content,
                    createdAt: Date.now(),
                }
                dispatch(inboxSlice.actions.updateMessages(newMsg))
            }
        })
    }, [])

    socket.current = io(import.meta.env.VITE_SOCKET_URL || BASE_URL);

    return (
        <Stack
            sx={{
                width: '100%',
            }}
            direction={'row'}
        >
            {
                (!isDesktop && userId) ? "" : <AllChats />
            }
            {userId && socket?.current ? (
                <Conversation socket={socket.current} />
            ) : (<>
                {isDesktop &&
                    <NoConversation />
                }
            </>
            )}
        </Stack>
    )
}

export default Inbox
