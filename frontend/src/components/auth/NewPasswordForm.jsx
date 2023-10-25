import { useEffect, useState } from 'react';
import * as Yup from 'yup';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Stack, IconButton, InputAdornment, Button } from '@mui/material';
// components
import { Eye, EyeSlash, Spinner } from 'phosphor-react';
import { useParams, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import MyFormProvider from '../forms/MyFormProvider';
import RHFTextField from '../forms/RHFTextField';
import { resetPassword } from '../../redux/slices/userSlice';

// ----------------------------------------------------------------------

export default function NewPasswordForm() {
  const dispatch = useDispatch();
  const { token } = useParams();
  const [showPassword, setShowPassword] = useState(false);
  const { isLoading } = useSelector(state => state.user)

  const VerifyCodeSchema = Yup.object().shape({

    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
    passwordConfirm: Yup.string()
      .required('Confirm password is required')
      .oneOf([Yup.ref('password'), null], 'Passwords must match'),
  });

  const defaultValues = {
    password: '',
    passwordConfirm: '',
  };

  const methods = useForm({
    mode: 'onChange',
    resolver: yupResolver(VerifyCodeSchema),
    defaultValues,
  });

  const {
    handleSubmit,
  } = methods;

  const onSubmit = async (data) => {
    try {
      //   Send API Request
      dispatch(resetPassword({ password: data.password, token }));
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <MyFormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>


        <RHFTextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
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

        <RHFTextField
          name="passwordConfirm"
          label="Confirm New Password"
          type={showPassword ? 'text' : 'password'}
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

        <Button
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
          {
            isLoading ? <Spinner /> :
              "Update Password"
          }
        </Button>
      </Stack>
    </MyFormProvider>
  );
}
