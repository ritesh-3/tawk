import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from "@hookform/resolvers/yup";
import { DefaultValues, LoginSchema } from '../../constants/constants';
import RHFTextField from '../forms/RHFTextField';
import { Eye, EyeSlash } from "phosphor-react";
import { Alert, IconButton, InputAdornment, Link, Stack } from '@mui/material';
import MyFormProvider from '../forms/MyFormProvider';
import { Link as RouterLink } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
import { LoginUser } from '../../redux/slices/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import customLogger from '../../utils/logger';

const LoginForm = () => {
    const [showPassword, setShowPassword] = useState(false);
    const { isLoading } = useSelector(state => state.user)
    const dispatch = useDispatch();
    const methods = useForm({
        resolver: yupResolver(LoginSchema),
        defaultValues: DefaultValues,
    })

    const {
        reset,
        setError,
        handleSubmit,
        formState: { errors },
    } = methods;
    /**
     * @name LoginForm#onSubmit
     * */
    const onSubmit = async (data) => {
        try {
            customLogger.trace("Dispacthed Login User", "LoginForm#onSubmit", "", data)
            dispatch(LoginUser(data));
        } catch (error) {
            console.error(error);
            reset();
            setError("afterSubmit", {
                ...error,
                message: error.message,
            });
        }
    };

    return (
        <MyFormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            {!!errors.afterSubmit && (
                <Alert severity="error">{errors.afterSubmit.message}</Alert>
            )}

            <Stack spacing={3}>
                <RHFTextField name="userId" label="username or email" />
                <RHFTextField
                    name="password"
                    label="password"
                    type={showPassword ? "text" : "password"}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={() => setShowPassword(!showPassword)}
                                    edge="end"
                                >
                                    {showPassword ? <Eye /> : <EyeSlash />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
            </Stack>
            <Stack alignItems="flex-end" sx={{ my: 2 }}>
                <Link component={RouterLink} to="/auth/forgot" variant="body2" color="inherit" underline="always">
                    Forgot password?
                </Link>
            </Stack>
            <LoadingButton
                fullWidth
                color="inherit"
                size="large"
                type="submit"
                variant="contained"
                loading={isLoading}
                sx={{
                    bgcolor: "text.primary",
                    color: (theme) =>
                        theme.palette.mode === "light" ? "common.white" : "grey.800",
                    "&:hover": {
                        bgcolor: "text.primary",
                        color: (theme) =>
                            theme.palette.mode === "light" ? "common.white" : "grey.800",
                    },
                }}
            >
                Login
            </LoadingButton>
        </MyFormProvider>
    )
}

export default LoginForm
