import { ChatCircleDots, Gear, House, Phone, SignOut, User, Users } from "phosphor-react";

export const Nav_Buttons = [
    {
        index: 0,
        icon: <House />,
        path:'/app'
    },
    {
        index: 1,
        icon: <Users />,
        path:'/users'
    },
    {
        index: 2,
        icon: <ChatCircleDots />,
        path:'/inbox'
    },
    // {
    //     index: 2,
    //     icon: <Phone />,
    // },
];


export const Profile_Menu = [
    {
      title: "Profile",
      icon: <User />,
    },
    {
      title: "Theme",
      icon: <Gear />,
    },
    {
      title: "Sign Out",
      icon: <SignOut />,
    },
  ];