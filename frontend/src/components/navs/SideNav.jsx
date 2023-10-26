import { Box, IconButton, Stack, useTheme } from '@mui/material';
import React from 'react'
import customLogger from '../../utils/logger';
import { ImagesConstant } from '../../constants/constants';
import { Nav_Buttons } from '../../constants/data';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { UpdateTab } from '../../redux/slices/app';
import ProfileMenu from '../menus/ProfileMenu';
const SideNav = () => {
    const navigate = useNavigate();
    //customLogger.trace("Loading SideNav comp", "SideNav()")
    const theme = useTheme();
    const { tab } = useSelector(state => state.app)

    const dispatch = useDispatch();
    /**
     * @name SideNav#handleChangeTab
     * @param {*} index 
     */
    const handleChangeTab = (item) => {
        customLogger.trace("handleChangeTab invoked", "SideNav#handleChangeTab")
        dispatch(UpdateTab({ tab: item.index }));
        navigate(item.path);
    };


    return (
        <Box
            sx={{
                height: "100vh",
                width: 100,
                backgroundColor:
                    theme.palette.mode === "light"
                        ? "#F0F4FA"
                        : theme.palette.background.paper,
                boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
            }}
        >
            <Stack
                py={3}
                alignItems={"center"}
                justifyContent="space-between"
                sx={{ height: "100%" }}
            >
                <Stack alignItems={"center"} spacing={4}>
                    <Box
                        sx={{
                            height: 64,
                            width: 64,
                            borderRadius: 1.5,
                            backgroundColor: theme.palette.primary.main,
                        }}
                        p={1}
                    >
                        <img src={ImagesConstant.logo} alt="WebTalk" />
                    </Box>
                    <Stack
                        sx={{ width: "max-content" }}
                        direction="column"
                        alignItems={"center"}
                        spacing={3}
                    >
                        {Nav_Buttons.map((el) => {
                            return el.index == tab ? (
                                <Box key={el.index}
                                    sx={{
                                        backgroundColor: theme.palette.primary.main,
                                        borderRadius: 1.5,
                                    }}
                                    p={1}
                                >
                                    <IconButton
                                        onClick={() => {
                                            handleChangeTab(el);
                                        }}
                                        sx={{ width: "max-content", color: "#ffffff" }}
                                    >
                                        {el.icon}
                                    </IconButton>
                                </Box>
                            ) : (
                                <IconButton key={el.index}
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
                    </Stack>
                </Stack>
                <Stack spacing={4}>
                    {/* <AntSwitch
                        defaultChecked={theme.palette.mode === "dark"}
                        onChange={onToggleMode}
                    /> */}
                    {/* Profile Menu */}
                    <ProfileMenu />
                </Stack>
            </Stack>
        </Box>
    )
}

export default SideNav
