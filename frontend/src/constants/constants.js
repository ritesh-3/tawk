import * as Yup from "yup";

export const BASE_URL = "http://localhost:4000/";
// export const BASE_URL = "https://tawk-backend.vercel.app/";

export const ImagesConstant = {
    logo: '/assets/images/logo.ico',
}

export const DefaultValues = {
    userId: "demo@tawk.com",
    password: "demo1234",
};

export const RegisterDefaultValues = {
    name: "Demo Guy",
    username: "demo_01",
    email: "demo@tawk.com",
    password: "demo1234",
};

export const LoginSchema = Yup.object().shape({
    userId: Yup.string().required("username or email is required"),
    password: Yup.string().required("Password is required"),
});

export const RegisterSchema = Yup.object().shape({
    name: Yup.string().required("Full name required"),
    username: Yup.string().required("User name required"),
    email: Yup.string()
        .required("Email is required")
        .email("Email must be a valid email address"),
    password: Yup.string().required("Password is required"),
});

export const UpdateProfileSchema = Yup.object().shape({
    name: Yup.string().required("Full name required"),
    username: Yup.string().required("User name required"),
    bio: Yup.string().required("Bio is required"),
    avatar: Yup.string().required("Avatar is required"),
    email: Yup.string()
        .required("Email is required")
        .email("Email must be a valid email address"),
});

