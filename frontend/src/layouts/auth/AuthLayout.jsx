import React from 'react'
import { Container, Stack } from '@mui/material'
import { Navigate, Outlet } from 'react-router-dom'
import { ImagesConstant } from '../../constants/constants'
import { useSelector } from 'react-redux'
import customLogger from '../../utils/logger'

const AuthLayout = () => {
  customLogger.info("Loading AuthLayout","AuthLayout()")
  const { isLoggedIn } = useSelector((state) => state.user);

  if (isLoggedIn) {
    return <Navigate to={"/app"} />;
  }

  return (
    <Container sx={{ mt: 5 }} maxWidth="sm">
      <Stack spacing={5} >
        <Stack
          sx={{ width: "100%" }}
          direction="column"
          alignItems={"center"}
        >
          <img style={{ height: 150, width: 150 }} src={ImagesConstant.logo} alt="Logo" />
        </Stack>
      </Stack>
      <Outlet />
    </Container>
  )
}

export default AuthLayout
