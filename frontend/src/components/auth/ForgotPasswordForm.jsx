import * as Yup from "yup";
// form
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
// components
import { useDispatch, useSelector } from "react-redux";
// import { ForgotPassword } from "../../redux/slices/auth";
import { LoadingButton } from "@mui/lab";
import MyFormProvider from "../../components/forms/MyFormProvider";
import RHFTextField from "../../components/forms/RHFTextField";
import { forgotPassword } from "../../redux/slices/userSlice";
import customLogger from "../../utils/logger";

// ----------------------------------------------------------------------

export default function ForgotPassworForm() {
    const { isLoading } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const ResetPasswordSchema = Yup.object().shape({
        email: Yup.string()
            .required("Email is required")
            .email("Email must be a valid email address"),
    });

    const methods = useForm({
        resolver: yupResolver(ResetPasswordSchema),
        defaultValues: { email: "" },
    });

    const { handleSubmit, reset } = methods;

    const onSubmit = async (data) => {
        try {
            if (data) {
                dispatch(forgotPassword(data.email))
                reset()
            }
        } catch (error) {
            customLogger.error("ForgotPasswordPage", "Error occured", "", error)
        }
    };

    return (
        <MyFormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <RHFTextField name="email" label="Email address" />

            <LoadingButton
                loading={isLoading}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                sx={{
                    mt: 3,
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
                Send Request
            </LoadingButton>
        </MyFormProvider>
    );
}
