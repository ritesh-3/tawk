import React, { useEffect, useRef, useState } from "react";
import { Box, Badge, Stack, Avatar, Typography } from "@mui/material";
import { styled, useTheme, alpha } from "@mui/material/styles";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { io } from 'socket.io-client';
import { BASE_URL } from "../../constants/constants";
import { formatChatTime } from "../../utils/utils";

const truncateText = (string, n) => {
    return string?.length > n ? `${string?.slice(0, n)}...` : string;
};

const StyledChatBox = styled(Box)(({ theme }) => ({
    "&:hover": {
        cursor: "pointer",
    },
}));

const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
        backgroundColor: "#44b700",
        color: "#44b700",
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        "&::after": {
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            animation: "ripple 1.2s infinite ease-in-out",
            border: "1px solid currentColor",
            content: '""',
        },
    },
    "@keyframes ripple": {
        "0%": {
            transform: "scale(.8)",
            opacity: 1,
        },
        "100%": {
            transform: "scale(2.4)",
            opacity: 0,
        },
    },
}));

const ChatElement = ({ _id, users, latestMessage }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();
    const [friend, setFriend] = useState({});
    const theme = useTheme();

    const socket = useRef(null);
    const [isOnline, setIsOnline] = useState(false);

    const { user } = useSelector((state) => state.user);

    useEffect(() => {
        const friendDetails = users.find((u) => u._id !== user._id);
        setFriend(friendDetails)
    }, [users]);

    return (
        <StyledChatBox
            onClick={() => {
                // dispatch(SelectConversation({ room_id: id }));
                navigate(`/inbox/t/${_id}/${friend._id}`)
            }}
            sx={{
                width: "100%",
                borderRadius: 1,
                // background: theme.palette.mode === "light"
                //         ? alpha(theme.palette.primary.main, 0.5)
                //         : theme.palette.primary.main
                backgroundColor: params.chatId === _id
                    ? theme.palette.mode === "light"
                        ? alpha(theme.palette.primary.main, 0.5)
                        : theme.palette.primary.main
                    : theme.palette.mode === "light"
                        ? "#fff"
                        : theme.palette.background.paper,
            }}
            p={2}
        >
            <Stack
                direction="row"
                alignItems={"center"}
                justifyContent="space-between"
            >
                <Stack direction="row" spacing={2}>
                    {" "}
                    {isOnline ? (
                        <StyledBadge
                            overlap="circular"
                            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                            variant="dot"
                        >
                            <Avatar alt={friend.name} src={friend.avatar?.url} />
                        </StyledBadge>
                    ) : (
                        <Avatar alt={friend.name} src={friend.avatar?.url} />
                    )}
                    <Stack spacing={0.3}>
                        <Typography variant="subtitle2">{friend.name}</Typography>
                        <Typography variant="caption">{truncateText(latestMessage.content, 20)}</Typography>
                    </Stack>
                </Stack>
                <Stack spacing={2} alignItems={"center"}>
                    <Typography sx={{ fontWeight: 200 }} variant="caption">
                        {formatChatTime(latestMessage.createdAt)}
                    </Typography>
                    {/* <Badge
                        className="unread-count"
                        color="primary"
                        badgeContent={unread}
                    /> */}
                </Stack>
            </Stack>
        </StyledChatBox>
    );
};

export default ChatElement;
