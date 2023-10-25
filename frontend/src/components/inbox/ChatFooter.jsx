import { Box, IconButton, InputAdornment, Stack, TextField, styled, useTheme } from '@mui/material';
import { PaperPlaneTilt, Smiley } from 'phosphor-react';
import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import useResponsive from '../../hooks/useResponsive';
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import { useParams } from 'react-router-dom';
import { sendMessage } from '../../redux/slices/inbox';

const StyledInput = styled(TextField)(({ theme }) => ({
    "& .MuiInputBase-input": {
        paddingTop: "12px !important",
        paddingBottom: "12px !important",
    },
}));


const ChatInput = ({
    openPicker,
    setOpenPicker,
    setValue,
    value,
    inputRef,
}) => {
    const [openActions, setOpenActions] = React.useState(false);
    const [openImageDialog, setopenImageDialog] = useState(false);
    const hanldeCloseImageDialog = () => {
        setopenImageDialog(false);
    }

    const handleOpenImageDialog = () => {
        setopenImageDialog(true)
    }
    return (
        <StyledInput
            inputRef={inputRef}
            value={value}
            onChange={(event) => {
                setValue(event.target.value);
            }}
            fullWidth
            placeholder="Write a message..."
            variant="filled"
            InputProps={{
                disableUnderline: true,
                endAdornment: (
                    <Stack sx={{ position: "relative" }}>
                        <InputAdornment position='end'>
                            <IconButton
                                onClick={() => {
                                    setOpenPicker(!openPicker);
                                }}
                            >
                                <Smiley />
                            </IconButton>
                        </InputAdornment>
                    </Stack>

                ),
            }}
        />
    );
};


const ChatFooter = ({ socket }) => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.user)
    const { chatId, userId } = useParams();
    const isMobile = useResponsive("between", "md", "xs", "sm");
    const [openPicker, setOpenPicker] = useState(false);


    const [value, setValue] = useState("");
    const inputRef = useRef(null);

    function handleEmojiClick(emoji) {
        const input = inputRef.current;

        if (input) {
            const selectionStart = input.selectionStart;
            const selectionEnd = input.selectionEnd;

            setValue(
                value.substring(0, selectionStart) +
                emoji +
                value.substring(selectionEnd)
            );

            // Move the cursor to the end of the inserted emoji
            input.selectionStart = input.selectionEnd = selectionStart + 1;
        }
    }

    const handleSendMessage = () => {
        const msgData = {
            chatId: chatId,
            content: value
        }

        if (socket) {
            socket.emit("sendMessage", {
                senderId: user._id,
                receiverId: userId,
                content: value,
            })
        }
        dispatch(sendMessage(msgData))
        setValue("");
    }
    return (
        <Box
            sx={{
                position: "relative",
                backgroundColor: "transparent !important",
            }}
        >
            <Box
                p={isMobile ? 1 : 2}
                width={"100%"}
                sx={{
                    backgroundColor:
                        theme.palette.mode === "light"
                            ? "#F8FAFF"
                            : theme.palette.background,
                    boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
                }}
            >
                <Stack direction="row" alignItems={"center"} spacing={isMobile ? 1 : 3}>
                    <Box
                        style={{
                            zIndex: 10,
                            position: "fixed",
                            display: openPicker ? "inline" : "none",
                            bottom: 81,
                            // right: isMobile ? 20 : sideBar.open ? 420 : 100,
                        }}
                    >
                        <Picker
                            theme={theme.palette.mode}
                            data={data}
                            onEmojiSelect={(emoji) => {
                                handleEmojiClick(emoji.native);
                            }}
                        />
                    </Box>
                    <ChatInput
                        inputRef={inputRef}
                        value={value}
                        setValue={setValue}
                        openPicker={openPicker}
                        setOpenPicker={setOpenPicker}
                    />
                    <Box
                        sx={{
                            height: 48,
                            width: 48,
                            backgroundColor: theme.palette.primary.main,
                            borderRadius: 1.5,
                        }}
                    >
                        <Stack
                            sx={{ height: "100%" }}
                            alignItems={"center"}
                            justifyContent="center"
                        >
                            <IconButton
                                onClick={handleSendMessage}
                            >
                                <PaperPlaneTilt color="#ffffff" />
                            </IconButton>
                        </Stack>
                    </Box>
                </Stack>
            </Box>
        </Box>
    )
}

export default ChatFooter
