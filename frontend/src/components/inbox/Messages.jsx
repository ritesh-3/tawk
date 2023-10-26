import { Box, Stack, Typography, alpha, useTheme } from '@mui/material';
import React, { useEffect, useRef } from 'react'
import { formatChatTime } from '../../utils/utils';

const TextMsg = ({ ownMsg, avatar, content, createdAt }) => {
    const theme = useTheme();
    return (
        <Stack direction="row" justifyContent={ownMsg ? "start" : "end"}>
            <Box
                px={1.5}
                py={1.5}
                sx={{
                    backgroundColor: ownMsg
                        ? theme.palette.background.paper
                        : theme.palette.primary.main,
                    borderRadius: 1.5,
                    width: "max-content",
                }}
            >
                <Stack direction={"row"} justifyContent={"space-between"}>
                    <Typography
                        variant="body2"
                        color={ownMsg ? theme.palette.text : "#fff"}
                    >
                        {content}
                    </Typography>
                    <Typography sx={{ fontWeight: 200, pl: 2, pt: 1 }} variant="caption">
                        {formatChatTime(createdAt)}
                    </Typography>
                </Stack>
            </Box>
            {/* {menu && <MessageOption message={el} />} */}
        </Stack>
    );
};

const Messages = ({ messages, user, otherUser }) => {
    const scrollRef = useRef(null);
    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages]);
    return (
        <Stack spacing={3} paddingX={2} >
            {
                messages && messages.map((msg, idx) => (
                    <Box key={idx}>
                        <TextMsg ownMsg={msg.sender === user._id} {...otherUser} {...msg} />
                        <div style={{ marginBottom: 1 }} ref={scrollRef}></div>
                    </Box>
                ))
            }
        </Stack>
    )
}

export default Messages
