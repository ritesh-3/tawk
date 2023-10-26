import React, { useEffect, useState } from 'react'
import { Link as RouterLink } from 'react-router-dom';
import { Avatar, Box, Button, Card, CardContent, Link, Paper, Stack, TextField, Typography, styled, useTheme } from '@mui/material'
// import { allUsers } from '../../constants/constants'
import useResponsive from '../../hooks/useResponsive'
import { useDispatch, useSelector } from 'react-redux'
import { LoadAllUsers } from '../../redux/slices/userSlice'
import { LoadingButton } from '@mui/lab';
import useFollowUser from '../../hooks/useFollowUser';
import ChatLoader from '../../components/loader/ChatLoader';

const StyledChatBox = styled(Box)(({ theme }) => ({
  "&:hover": {
    cursor: "pointer",
  },
}));

const UserCard = ({ user }) => {

  const theme = useTheme();
  const isDesktop = useResponsive("up", "md");

  const [follow, followLoading, setFollow, handleFollow] = useFollowUser();
  /**
   * @name UserCard#handleFollow
   */
  return (

    <Paper sx={{
      alignItems: 'center',
      marginBottom: 2, display: 'flex',
      justifyContent: 'space-between',
      width: "100%",
      background: theme.palette.mode === "light"
        ? "#F0F4FA"
        : theme.palette.background.paper,

    }}
      elevation={3}
    >
      <CardContent>
        <Stack direction="row" spacing={2} alignItems='center'>
          <Typography variant="h6">{user.name}</Typography>
          <LoadingButton
            sx={{
              color: "common.white"
            }}
            loading={followLoading}
            variant="contained" onClick={() => handleFollow(user._id)}>
            {follow ? 'UnFollow' : 'Follow'}
          </LoadingButton>
        </Stack>
        <Stack spacing={1}>
          <Typography variant="subtitle1" color="textSecondary">
            <Link underline="none" component={RouterLink} to={`/${user.username}`} >
              {user.username}
            </Link>
          </Typography>

          <Typography variant="body2" color="textSecondary">
            {user.bio}
          </Typography>
        </Stack>

      </CardContent>
      <Avatar
        src={user.avatar.url}
        alt={user.name}
        sx={{
          mr: 2,
          width: isDesktop ? '100px' : "80px",
          height: isDesktop ? '100px' : "80px",
        }}
      />
    </Paper>

  )
}

const NoUsersFoundMessage = () => {
  return (
    <Box
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '80%',
      }}
    >
      <Typography variant="h4" color="textSecondary">
        No users found for your search
      </Typography>
      <Typography variant="body1" color="textSecondary">
        "Sometimes the right people are just a click away. Keep searching!"
      </Typography>
    </Box>
  );
};



const FindUsers = () => {

  const theme = useTheme()
  const isDesktop = useResponsive("up", "md");
  const [search, setSearch] = useState('');
  const { allUsers, isLoading } = useSelector(state => state.user)
  // const filteredUsers = useState(null)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(LoadAllUsers());
  }, []);

  // Use a local variable to filter users
  const filteredUsers = allUsers && allUsers.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );


  return (
    <>
      <Stack
        sx={{
          margin: "auto",
          height: "100%",
          width: isDesktop ? "60vw" : "100vw",
          backgroundColor:
            theme.palette.mode === "light"
              ? "#FFFFF"
              : theme.palette.background,
          // boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
        }}
        padding={2}
        spacing={2}
        alignItems='center'
      >
        <TextField
          sx={{ width: isDesktop ? "50%" : '80%' }}
          label="Search Users"
          variant="outlined"
          onChange={(e) => setSearch(e.target.value)}
        />
        <Box sx={{ width: '100%', height: '100%', overflowY: 'auto' }}>
          {isLoading ? <ChatLoader loading={isLoading} /> :
            <>
              {filteredUsers && filteredUsers.length > 0 ? filteredUsers.map((item, idx) => (
                <UserCard key={idx} user={item} />
              )) :

                <NoUsersFoundMessage />
              }
            </>
          }
        </Box>
      </Stack>
    </>
  )
}

export default FindUsers
