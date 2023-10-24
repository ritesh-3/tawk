import * as Yup from "yup";

// export const BASE_URL = "http://localhost:4000/";
export const BASE_URL = "https://tawk-backend.vercel.app/";

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

export const allUsers = [
    {
        _id: "6531325ce1e5c45ceb8ced1a",
        avatar: {
            public_id: "tawk/dtg9xiyfwcbgzydh9gre",
            url: "https://res.cloudinary.com/dlypcndtu/image/upload/v1697722744/tawk/dtg9xiyfwcbgzydh9gre.png"
        },
        name: "Demo Guy",
        email: "demo@tawk.com",
        username: "demo_01",
        password: "$2b$10$OWraVFWdiMrnF3OVWhjbOOd.duDft3aU3g2PKbBLqqZ76ICrlZ.8i",
        bio: "Hi👋 Welcome To My Profile",
    },
    {
        _id: "6531325ce1e5c45ceb8ced1b",
        name: "Demo Guy2",
        avatar: {
            public_id: "tawk/dtg9xiyfwcbgzydh9gre",
            url: "https://res.cloudinary.com/dlypcndtu/image/upload/v1697722744/tawk/dtg9xiyfwcbgzydh9gre.png"
        },
        email: "demo2@tawk.com",
        username: "demo_02",
        password: "$2b$10$OWraVFWdiMrnF3OVWhjbOOd.duDft3aU3g2PKbBLqqZ76ICrlZ.8i",
        bio: "Hi👋 Welcome To My Profile",
    },
    {
        _id: "6531325ce1e5c45ceb8ced1c",
        name: "Demo Guy3",
        avatar: {
            public_id: "tawk/dtg9xiyfwcbgzydh9gre",
            url: "https://res.cloudinary.com/dlypcndtu/image/upload/v1697722744/tawk/dtg9xiyfwcbgzydh9gre.png"
        },
        email: "demo3@tawk.com",
        username: "demo_03",
        password: "$2b$10$OWraVFWdiMrnF3OVWhjbOOd.duDft3aU3g2PKbBLqqZ76ICrlZ.8i",
        bio: "Hi👋 Welcome To My Profile",
    },
    {
        _id: "6531325ce1e5c45ceb8ced1c",
        name: "Demo Guy3",
        avatar: {
            public_id: "tawk/dtg9xiyfwcbgzydh9gre",
            url: "https://res.cloudinary.com/dlypcndtu/image/upload/v1697722744/tawk/dtg9xiyfwcbgzydh9gre.png"
        },
        email: "demo3@tawk.com",
        username: "demo_03",
        password: "$2b$10$OWraVFWdiMrnF3OVWhjbOOd.duDft3aU3g2PKbBLqqZ76ICrlZ.8i",
        bio: "Hi👋 Welcome To My Profile",
    },
    {
        _id: "6531325ce1e5c45ceb8ced1c",
        name: "Demo Guy3",
        avatar: {
            public_id: "tawk/dtg9xiyfwcbgzydh9gre",
            url: "https://res.cloudinary.com/dlypcndtu/image/upload/v1697722744/tawk/dtg9xiyfwcbgzydh9gre.png"
        },
        email: "demo3@tawk.com",
        username: "demo_03",
        password: "$2b$10$OWraVFWdiMrnF3OVWhjbOOd.duDft3aU3g2PKbBLqqZ76ICrlZ.8i",
        bio: "Hi👋 Welcome To My Profile",
    },
    {
        _id: "6531325ce1e5c45ceb8ced1c",
        name: "Demo Guy3",
        avatar: {
            public_id: "tawk/dtg9xiyfwcbgzydh9gre",
            url: "https://res.cloudinary.com/dlypcndtu/image/upload/v1697722744/tawk/dtg9xiyfwcbgzydh9gre.png"
        },
        email: "demo3@tawk.com",
        username: "demo_03",
        password: "$2b$10$OWraVFWdiMrnF3OVWhjbOOd.duDft3aU3g2PKbBLqqZ76ICrlZ.8i",
        bio: "Hi👋 Welcome To My Profile",
    },
    {
        _id: "6531325ce1e5c45ceb8ced1c",
        name: "Demo Guy3",
        avatar: {
            public_id: "tawk/dtg9xiyfwcbgzydh9gre",
            url: "https://res.cloudinary.com/dlypcndtu/image/upload/v1697722744/tawk/dtg9xiyfwcbgzydh9gre.png"
        },
        email: "demo3@tawk.com",
        username: "demo_03",
        password: "$2b$10$OWraVFWdiMrnF3OVWhjbOOd.duDft3aU3g2PKbBLqqZ76ICrlZ.8i",
        bio: "Hi👋 Welcome To My Profile",
    },
]
