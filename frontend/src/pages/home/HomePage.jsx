import React, { useEffect } from 'react'
import { Avatar, Box, Button, Link, Paper, Stack, Typography, useTheme } from '@mui/material'
import { useState } from 'react'
import NewPostDialog from '../../components/dialogs/NewPostDialog'
import { getPostsOfFollowing } from '../../redux/slices/postSlice'
import { useDispatch, useSelector } from 'react-redux'
import { Link as RouterLink } from 'react-router-dom'
import PostLoading from '../../components/loader/PostLoading'
import PostCard from '../../components/post/PostCard'

const HeaderTile = ({ user, setOpenDialog }) => {
  const theme = useTheme();
  return <Paper elevation={2}
    sx={{
      display: 'flex',
      borderRadius: '4px 0px 4px 0px',
      justifyContent: 'space-between',
      padding: 2,
      background: theme.palette.mode === "light"
        ? "#F0F4FA"
        : theme.palette.background.paper,
    }}
  >

    <Stack direction={'row'} spacing={2} alignItems={'center'}>
      <Avatar src={user.avatar.url} />
      <Box>
        <Link component={RouterLink} to={`/${user.username}`} >{user.username}</Link>
        <Typography >{user.name}</Typography>
      </Box>
    </Stack>

    <Button
      onClick={() => setOpenDialog(true)}
    >
      Add New Post
    </Button>
  </Paper>
}

// const PostCard = ({ _id, caption, likes, comments, image, postedBy, savedBy, createdAt }) => {
//   return (
//     <Box >
//       <Stack direction={'row'} spacing={2} alignItems={'center'}>
//         <Avatar sx={{ height: '30px', width: '30px' }} src={postedBy.avatar.url} />
//         <Box>
//           <Link fontSize={14} component={RouterLink} to={`/${postedBy.username}`} >{postedBy.username}</Link>
//           <Typography fontSize={14} >{postedBy.name}</Typography>
//         </Box>
//       </Stack>
//       <img style={{ height: 'auto', maxHeight:'350px' }} src={image.url} alt="" />
//     </Box>
//   )
// }

const PostList = () => {
  const { posts, totalPosts } = useSelector(state => state.posts)

  return (<>
    <Stack spacing={2} >
      {
        posts.length > 0 ?
          posts.map((p) => (
            <PostCard key={p._id}  {...p} />
          )) : <Box sx={{
            display: 'flex',
            justifyContent: 'center'
          }}>
            <Typography variant='h5'>
              No Post By Your Followes 😟
            </Typography>
          </Box>
      }
    </Stack>
  </>)
}

const HomePage = () => {
  const [openDialog, setOpenDialog] = useState(false)
  const { user } = useSelector(state => state.user)
  const { success, postsLoading, posts, totalPosts } = useSelector(state => state.posts)
  const theme = useTheme();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPostsOfFollowing());
    if (success) {
      setOpenDialog(false);
    }
  }, [success])

  return (
    <Box
      sx={{
        maxWidth: '600px',
        width: '100%',
        height: '100vh',
        mx: 'auto'
      }}
    >
      <HeaderTile user={user} setOpenDialog={setOpenDialog} />
      <Paper sx={{
        mt: 3,
        height: '85%',
        overflowY: 'scroll',
        background: theme.palette.mode === "light"
          ? ""
          : theme.palette.background.default,

      }}
      >
        {postsLoading ? <>
          {
            Array(2).fill("").map((item, idx) => (
              <PostLoading key={idx} postsLoading />
            ))
          }
        </> :
          <PostList />
        }
      </Paper>
      {openDialog && <NewPostDialog open={openDialog} onClose={() => setOpenDialog(false)} />}
    </Box>
  )
}

export default HomePage
