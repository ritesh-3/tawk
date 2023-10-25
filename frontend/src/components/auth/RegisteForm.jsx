import { useState } from "react";
import * as Yup from "yup";
// form
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
// @mui
import { Link, Stack, Alert, IconButton, InputAdornment, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
// components
import { Eye, EyeSlash } from "phosphor-react";
import { useDispatch, useSelector } from "react-redux";
import { RegisterDefaultValues, RegisterSchema } from "../../constants/constants";
import MyFormProvider from "../forms/MyFormProvider";
import RHFTextField from "../forms/RHFTextField";
import { RegisterUser } from "../../redux/slices/userSlice";
// import { RegisterUser } from "../../redux/slices/auth";

// ----------------------------------------------------------------------

export default function AuthRegisterForm() {
    const dispatch = useDispatch();
    const { isLoading } = useSelector((state) => state.user);
    const [showPassword, setShowPassword] = useState(false);

    const methods = useForm({
        resolver: yupResolver(RegisterSchema),
        defaultValues: RegisterDefaultValues,
    });

    const {
        reset,
        setError,
        handleSubmit,
        formState: { errors },
    } = methods;

    const onSubmit = async (data) => {
        try {
            // submit data to backend
            dispatch(RegisterUser(data));
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
            <Stack spacing={3} mb={4}>
                {!!errors.afterSubmit && (
                    <Alert severity="error">{errors.afterSubmit.message}</Alert>
                )}

                <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                    <RHFTextField name="name" label="Full Name" />
                    <RHFTextField name="username" label="User Name" />
                </Stack>

                <RHFTextField name="email" label="Email address" helperText={"Email will be used for password recovery, so please enter a valid email"} />
                <RHFTextField
                    name="password"
                    label="Password"
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
                Create Account
            </LoadingButton>
        </MyFormProvider>
    );
}
