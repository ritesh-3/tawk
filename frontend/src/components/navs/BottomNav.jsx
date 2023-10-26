import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "@mui/material/styles";
import { Box, IconButton, Stack } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { Nav_Buttons } from "../../constants/data";
import ProfileMenu from "../menus/ProfileMenu";
import { UpdateTab } from "../../redux/slices/app";


const BottomNav = () => {
    const theme = useTheme();
    const { tab } = useSelector((state) => state.app);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { userId } = useParams();

    const handleChangeTab = (item) => {
        dispatch(UpdateTab({ tab: item.index }));
        navigate(item.path);
    };

    // Disable Nottom Nav for direct messages
    if (userId) {
        return
    }
    return (
        <Box
            sx={{
                // height: "100vh",
                zIndex: 10,
                position: "block",
                bottom: 0,
                width: "100vw",
                backgroundColor: theme.palette.background.paper,
                boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
            }}
        >
            <Stack
                sx={{ width: "100%" }}
                direction="row"
                alignItems={"center"}
                justifyContent="space-between"
                spacing={2}
                p={2}
            >
                {Nav_Buttons.map((el) => {
                    return el.index === tab ? (
                        <Box key={el.index}
                            sx={{ backgroundColor: theme.palette.primary.main, borderRadius: 1.5 }} p={1}>
                            <IconButton sx={{ width: "max-content", color: "#ffffff" }}
                                onClick={() => {
                                    handleChangeTab(el);
                                }}
                            >
                                {el.icon}
                            </IconButton>
                        </Box>
                    ) : (
                        <IconButton
                            key={el.index}
                            onClick={() => {
                                handleChangeTab(el);
                            }}
                            sx={{
                                width: "max-content",
                                color:
                                    theme.palette.mode === "light"
                                        ? "#080707"
                                        : theme.palette.text.primary,
                            }}
                        >
                            {el.icon}
                        </IconButton>
                    );
                })}
                <ProfileMenu />
            </Stack>
        </Box>
    );
};

export default BottomNav;
