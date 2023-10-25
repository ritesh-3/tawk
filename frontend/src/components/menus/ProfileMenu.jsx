import React, { useState } from "react";
import { Avatar, Box, Fade, Menu, MenuItem, Stack } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
// import { LogoutUser } from "../../redux/slices/auth";
// import { getSocket } from "../../socket";
import { useNavigate } from "react-router-dom";
import { Profile_Menu } from "../../constants/data";
import ThemeDialog from "../dialogs/ThemeDialog";
import { LogOut } from "../../redux/slices/userSlice";

const ProfileMenu = () => {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);
  const [openTheme, setOpenTheme] = useState(false);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOpenTheme = () => {
    setOpenTheme(true);
  };

  const handleCloseTheme = () => {
    setOpenTheme(false);
  };



  return (
    <>
      <Avatar
        id="profile-positioned-button"
        aria-controls={openMenu ? "profile-positioned-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={openMenu ? "true" : undefined}
        alt={user.name}
        src={user.avatar.url}
        onClick={handleClick}
      />
      <Menu
        MenuListProps={{
          "aria-labelledby": "fade-button",
        }}
        TransitionComponent={Fade}
        id="profile-positioned-menu"
        aria-labelledby="profile-positioned-button"
        anchorEl={anchorEl}
        open={openMenu}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Box p={1}>
          <Stack spacing={1}>
            {Profile_Menu.map((el, idx) => (
              <MenuItem key={idx} onClick={handleClose}>
                <Stack
                  onClick={() => {
                    if (idx === 0) {
                      navigate(`/${user.username}`);
                    }
                    else if (idx === 1) {
                      // navigate("/settings");
                      handleOpenTheme();
                    }
                    else {
                      dispatch(LogOut());
                      navigate('/')
                    }
                  }}
                  sx={{ width: 100 }}
                  direction="row"
                  alignItems={"center"}
                  justifyContent="space-between"
                >
                  <span>{el.title}</span>
                  {el.icon}
                </Stack>{" "}
              </MenuItem>
            ))}
          </Stack>
        </Box>
      </Menu>
      {openTheme && (
        <ThemeDialog open={openTheme} handleClose={handleCloseTheme} />
      )}
    </>
  );
};

export default ProfileMenu;
