import React, { useEffect, useState } from 'react';
import { Link as RouterLink, useParams } from 'react-router-dom'
import { Box, Button, Divider, Grid, ImageList, ImageListItem, Link, Stack, Typography, useTheme } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { followUser, getUserDetails } from '../../redux/slices/userSlice';
import BackdropLoader from '../../components/loader/BackdropLoader';
import useResponsive from '../../hooks/useResponsive';
import { LoadingButton } from "@mui/lab";
import FollowersDialog from '../../components/dialogs/FollowersDialog';
import useFollowUser from '../../hooks/useFollowUser';
import PostDialog from '../../components/dialogs/PostDialog';

const ProfilePage = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const { otherUser, user, isLoading } = useSelector(state => state.user)
    const theme = useTheme()
    const isDesktop = useResponsive("up", "md");
    const [openModal, setOpenModal] = useState(null);
    const [follow, followLoading, setFollow, handleFollow] = useFollowUser();
    const [openPostDialog, setOpenPostDialog] = useState(false);
    const [selectedPost, setSelectedPost] = useState(null);

    useEffect(() => {
        dispatch(getUserDetails(params.username))
    }, [params])

    useEffect(() => {
        setFollow(otherUser?.followers?.some((u) => u._id === user._id))
        //To update the comments on adding  new comment
        if (selectedPost) {
            const opnedPost = otherUser?.posts.filter(post => post._id === selectedPost._id)
            if (opnedPost) setSelectedPost(opnedPost[0]);
        }
    }, [otherUser]);

    const handleFollowersModal = () => {
        setOpenModal("Followers")
    }

    const handleFollowingModal = () => {
        setOpenModal("Following")
    }

    const closeModal = () => {
        setOpenModal(null)
    }

    const handlePostClick = (post) => {
        setSelectedPost(post)
        setOpenPostDialog(true);
    }

    const handlePostClose = () => {
        setSelectedPost(null)
        setOpenPostDialog(false);
    }
    return (
        <>
            {isLoading && <BackdropLoader />}
            {otherUser ? (
                // Profile Header
                <Box
                    sx={{
                        margin: "auto",
                        height: "100%",
                        padding: 3,
                        width: isDesktop ? "60vw" : "100vw",
                        backgroundColor:
                            theme.palette.mode === "light"
                                ? "#FFFFF"
                                : theme.palette.background,
                    }}
                >
                    <Stack alignItems='center' justifyContent='center' spacing={5} direction='row'>
                        <img height={isDesktop ? 150 : 80} width={isDesktop ? 150 : 80} src={otherUser.avatar.url} alt={otherUser.name} />
                        <Stack spacing={2} >
                            <Stack spacing={isDesktop ? 6 : 2} direction='row'>
                                <Typography variant='h4'>{otherUser.username}</Typography>
                                {
                                    user._id === otherUser._id ?
                                        <Button sx={{
                                            background: theme.palette.primary
                                        }} variant='contained' >Edit Profile</Button> :
                                        <>
                                            {follow ?
                                                <Stack direction={'row'} spacing={1}>
                                                    <LoadingButton onClick={() => { }} variant='outlined' sx={{ fontSize: 'small', fontWeight: 500, background: theme.palette.primary }}>Message</LoadingButton>
                                                    <LoadingButton loading={followLoading} onClick={() => handleFollow(otherUser._id)} variant='contained' sx={{
                                                        fontSize: 'small',
                                                        fontWeight: 500,
                                                        background: theme.palette.primary.main
                                                    }}>
                                                        UnFollow</LoadingButton>
                                                </Stack> :
                                                <LoadingButton loading={followLoading} onClick={() => handleFollow(otherUser._id)} variant='contained'
                                                    sx={{
                                                        fontSize: 'small',
                                                        fontWeight: 500,
                                                        background: theme.palette.primary.main
                                                    }}
                                                >Follow</LoadingButton>
                                            }
                                        </>
                                }
                            </Stack>
                            <Stack justifyContent='center' alignItems='center' spacing={isDesktop ? 6 : 2} direction={'row'}>
                                <Typography>{otherUser.posts.length} {"  "}posts</Typography>
                                <Typography >{otherUser.following.length}  {"  "} <span style={{ cursor: 'pointer' }} onClick={handleFollowingModal}> following</span></Typography>
                                <Typography>{otherUser.followers.length} {"  "} <span style={{ cursor: 'pointer' }} onClick={handleFollowersModal}>followers</span> </Typography>

                            </Stack>
                            <Typography >{otherUser.name}</Typography>
                            <Typography variant='caption'>
                                {otherUser.bio}
                            </Typography>
                        </Stack>
                    </Stack>
                    <Divider sx={{ my: 3 }} />
                    {/* Post Section */}
                    {otherUser.posts.length > 0 ?
                        <ImageList cols={3} >
                            {otherUser.posts.map((item, idx) => (
                                <ImageListItem key={idx}>
                                    <img onClick={() => handlePostClick(item)}
                                        // srcSet={`${item.image.url}?w=200&h=200&fit=crop&auto=format&dpr=2 2x`}
                                        src={`${item.image.url}?w=300&h=300&fit=crop&auto=format`}
                                        alt={item.title}
                                        loading="lazy"
                                    />
                                </ImageListItem>
                            ))}
                        </ImageList> :
                        <Stack spacing={4} justifyContent='center' alignItems='center' direction='row' width="100%">
                            <img src="/assets/images/noPosts.jpg" alt="NO Posts" height={isDesktop ? 300 : 200} />
                            <Typography variant='subtitle2'>
                                Start capturing and sharing your moments.
                            </Typography>
                        </Stack>
                    }
                </Box >
            ) : (
                <Typography variant='h4'>User Not Found</Typography>
            )}
            {openModal && <FollowersDialog
                open={true}
                userList={openModal === "Followers" ? otherUser?.followers : otherUser?.following}
                onClose={closeModal}
                title={openModal}
            />}
            {openPostDialog &&
                <PostDialog open={openPostDialog} onClose={handlePostClose} selectedPost={selectedPost} />
            }
        </>
    );
};

const Header = () => {
    return
}

export default ProfilePage;