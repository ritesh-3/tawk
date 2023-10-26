import { Avatar, Badge, Box, Button, IconButton, Link, Stack, Typography, styled, useTheme } from "@mui/material";
import { ArrowLeft, DotsThreeOutlineVertical } from "phosphor-react";
import { Link as RouterLink, useNavigate, useParams } from "react-router-dom";
import useResponsive from "../../hooks/useResponsive";

const StyledBadge = styled(Badge)(({ theme, online }) => ({
    "& .MuiBadge-badge": {
        backgroundColor: "#44b700",
        color: "#44b700",
        minWidth: '0px',
        height: '12px',
        display: online ? 'block':'none',
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

const ChatHeader = ({ user, online }) => {
    const theme = useTheme();
    const { userId } = useParams();
    const isDesktop = useResponsive("up", "md");
    const navigate = useNavigate()

    const handleBack = () => {
        if (userId) navigate('/inbox')
    }

    return (
        <Stack
            direction={"row"}
            justifyContent={'space-between'}
            sx={{
                width: '100%',
                borderRadius: '4px 0px 4px 0px',
                padding: 2,
                background: theme.palette.mode === "light"
                    ? "#F0F4FA"
                    : theme.palette.background.paper,
            }}
        >
            <Box>
                <StyledBadge
                    overlap="circular"
                    anchorOrigin={{
                        vertical: "top",
                        horizontal: "left",
                    }}
                    online={online}
                >
                    <Stack direction={'row'} spacing={2} alignItems={'center'}>
                        <Avatar src={user.avatar.url} />
                        <Box>
                            <Link component={RouterLink} to={`/${user.username}`} >{user.username}</Link>
                            <Typography >{user.name}</Typography>
                        </Box>
                    </Stack>
                </StyledBadge>
            </Box>

            <IconButton color='primary' onClick={handleBack}>
                {
                    (userId && !isDesktop) ? <ArrowLeft /> :
                        <DotsThreeOutlineVertical />
                }
            </IconButton>
        </Stack>
    )

}

export default ChatHeader;