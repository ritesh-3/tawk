import { LoadingButton } from '@mui/lab';
import { Avatar, Box, Dialog, Divider, Link, Slide, Stack, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { Link as RouterLink } from 'react-router-dom';
import useFollowUser from '../../hooks/useFollowUser';
import { useSelector } from 'react-redux';
import { useTheme } from '@emotion/react';


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const UserListItem = ({ _id, avatar, username, name, followers }) => {

  const [follow, followLoading, setFollow, handleFollow] = useFollowUser();
  const { user } = useSelector((state) => state.user);
  const theme = useTheme();

  useEffect(() => {
    const followed = followers?.some((id) => id === user._id);
    setFollow(followed)
  }, [user])

  return (
    <Stack direction='row' padding={4} width='100%' justifyContent={'space-between'}>
      <Stack direction='row' spacing={3} alignItems='center'>
        <Avatar src={avatar.url} />
        <Box>
          <Link component={RouterLink} to={`/${username}`}>{username}</Link>
          <Typography variant='subtitle2' >{name}</Typography>
        </Box>
      </Stack>
      <Box>
        <LoadingButton
          variant='contained'
          loading={followLoading}
          onClick={() => handleFollow(_id)}
          sx={{
            background: theme.palette.primary.main,
            color:"common.white"
          }}
        >
          {follow ? 'UnFollow' : 'Follow'}
        </LoadingButton>
      </Box>
    </Stack>
  )
}

const FollowersDialog = ({ open, onClose, title, userList }) => {
  return (
    <Dialog
      fullWidth
      maxWidth='xs'
      open={open}
      onClose={onClose}
      TransitionComponent={Transition}
    >
      <Stack alignItems='center' justifyContent='center' >
        <Typography padding={2} variant='h6'>
          {title}
        </Typography>
        {userList && userList.length > 0 && userList.map((u) => (
          <UserListItem {...u} key={u._id} />
        ))}
      </Stack>
    </Dialog>
  )
}

export default FollowersDialog
