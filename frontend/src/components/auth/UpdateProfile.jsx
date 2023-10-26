import { useCallback, useEffect, useState } from "react";
import * as Yup from "yup";
// form
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
// @mui
import { Link, Stack, Alert, IconButton, InputAdornment, Typography, Button } from "@mui/material";
import { LoadingButton } from "@mui/lab";
// components
import { Eye, EyeSlash, Spinner } from "phosphor-react";
import { useDispatch, useSelector } from "react-redux";
import { RegisterDefaultValues, RegisterSchema, UpdateProfileSchema } from "../../constants/constants";
import MyFormProvider from "../forms/MyFormProvider";
import RHFTextField from "../forms/RHFTextField";
import { RegisterUser, loadUser, updateProfile } from "../../redux/slices/userSlice";
import { RHFUploadAvatar } from "../forms/RHFUpload";
import { optimizeImage } from "../../utils/utils";
// import { RegisterUser } from "../../redux/slices/auth";

// ----------------------------------------------------------------------

export default function UpdateProfileForm() {
    const dispatch = useDispatch();
    const { isLoading } = useSelector((state) => state.user);
    const [showPassword, setShowPassword] = useState(false);
    const { user } = useSelector(state => state.user)
    const [file, setFile] = useState();
    const [selectedImage, setSelctedImage] = useState("")

    const userDetails = {
        name: user.name,
        username: user.username,
        bio: user.bio,
        email: user.email,
        avatar: {
            preview: user?.avatar?.url
        }
    }

    const methods = useForm({
        resolver: yupResolver(UpdateProfileSchema),
        defaultValues: userDetails,
    });

    const {
        reset,
        setError,
        setValue,
        handleSubmit,
        formState: { errors },
    } = methods;

    const onSubmit = async (data) => {
        try {
            // submit data to backend
            dispatch(updateProfile({ ...data, avatar: selectedImage }));
        } catch (error) {
            console.error(error);
            reset();
            setError("afterSubmit", {
                ...error,
                message: error.message,
            });
        }
    };

    const handleDrop = useCallback(
        (acceptedFiles) => {
            const file = acceptedFiles[0];

            setFile(file);

            const newFile = Object.assign(file, {
                preview: URL.createObjectURL(file),
            });
            // converting image into reader string as our api accept string only
            const reader = new FileReader();
            reader.onload = async () => {
                if (reader.readyState === 2) {
                    const optimizedImage = await optimizeImage(reader.result);
                    setSelctedImage(optimizedImage)
                }
            };
            reader.readAsDataURL(file);

            if (file) {
                setValue("avatar", newFile, { shouldValidate: true });
            }
        },
        [setValue]
    );



    return (
        <MyFormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={3} mb={4}>
                {!!errors.afterSubmit && (
                    <Alert severity="error">{errors.afterSubmit.message}</Alert>
                )}
                <RHFUploadAvatar name="avatar" maxSize={3145728} onDrop={handleDrop} />

                <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                    <RHFTextField name="name" label="Full Name" />
                    <RHFTextField name="username" label="User Name" />
                </Stack>

                <RHFTextField name="email" label="Email address" helperText={"Email will be used for password recovery, so please enter a valid email"} />
                <RHFTextField multiline rows={4} name="bio" label="Bio" />

            </Stack>

            <Button
                fullWidth
                color='primary'
                size="large"
                type="submit"
                variant="contained"
            >
                {isLoading ?
                    <Spinner /> :
                    "Update Profile"
                }
            </Button>
        </MyFormProvider>
    );
}
