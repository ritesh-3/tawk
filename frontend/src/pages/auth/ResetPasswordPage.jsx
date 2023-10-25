import { Stack, Typography, Link } from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import { CaretLeft } from "phosphor-react";
import NewPasswordForm from "../../components/auth/NewPasswordForm";
import { useSelector } from "react-redux";

const ResetPasswordPage = () => {
    const navigate = useNavigate()
    const { resetSuccess } = useSelector(state => state.user)

    useEffect(() => {
        if (resetSuccess) {
            navigate('/auth/login')
        }
    }, [resetSuccess])

    return (
        <>
            <Stack spacing={2} sx={{ mb: 5, position: "relative" }}>
                <Typography variant="h3" paragraph>
                    Reset Password
                </Typography>

                <Typography sx={{ color: "text.secondary", mb: 5 }}>
                    Please set your new password.
                </Typography>
            </Stack>

            {/* NewPasswordForm */}

            <NewPasswordForm />

            <Link
                component={RouterLink}
                to={"/auth/login"}
                color="inherit"
                variant="subtitle2"
                sx={{
                    mt: 3,
                    mx: "auto",
                    alignItems: "center",
                    display: "inline-flex",
                }}
            >
                <CaretLeft size={24} />
                Return to sign in
            </Link>
        </>
    );
};

export default ResetPasswordPage;
