import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import customLogger from '../../utils/logger';
import SideNav from '../../components/navs/SideNav';
import { Box, Stack } from '@mui/material';
import BottomNav from '../../components/navs/BottomNav';
import useResponsive from '../../hooks/useResponsive';
import { useTheme } from '@emotion/react';

const MainLayout = () => {
    //customLogger.trace("Loading MainLayout", "MainLayout()")

    const isDesktop = useResponsive("up", "md");
    const { isLoggedIn } = useSelector(state => state.user)
    const theme = useTheme();
    if (!isLoggedIn) {
        return <Navigate to={"/auth/login"} />;
    }
    return (
        <Box
            sx={{
                height: "100vh",
                display: 'flex',
                flexDirection: isDesktop ? 'row' : 'column'
            }}
        >
            {isDesktop && <SideNav />}
            <Box
                width={"100%"}
                sx={{
                    position: "relative",
                    flexGrow: 1,
                    overflowY: "scroll",
                    backgroundColor:
                        theme.palette.mode === "light"
                            ? "#"
                            : theme.palette.background,

                    boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
                }}
            >
                <Outlet />
            </Box>
            {!isDesktop && <BottomNav />}

        </Box>
    )
}

export default MainLayout
