import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import customLogger from '../../utils/logger';
import SideNav from '../../components/navs/SideNav';
import { Stack } from '@mui/material';
import BottomNav from '../../components/navs/BottomNav';
import useResponsive from '../../hooks/useResponsive';

const MainLayout = () => {
    customLogger.trace("Loading MainLayout", "MainLayout()")

    const isDesktop = useResponsive("up", "md");
    const { isLoggedIn } = useSelector(state => state.user)

    if (!isLoggedIn) {
        return <Navigate to={"/auth/login"} />;
    }
    return (
        <Stack direction="row"
            sx={{ height: "100vh" }}
        >
            {isDesktop ? <SideNav /> : <BottomNav />}

            <Outlet />
        </Stack>
    )
}

export default MainLayout
