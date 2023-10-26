import React, { useEffect, useState } from 'react';
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom'
import { Avatar, Box, Button, Divider, Grid, ImageList, ImageListItem, Link, Stack, Typography, useTheme } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails } from '../../redux/slices/userSlice';
import useResponsive from '../../hooks/useResponsive';
import { LoadingButton } from "@mui/lab";
import FollowersDialog from '../../components/dialogs/FollowersDialog';
import useFollowUser from '../../hooks/useFollowUser';
import PostDialog from '../../components/dialogs/PostDialog';
import PostLoading from '../../components/loader/PostLoading';
import ChatLoader from '../../components/loader/ChatLoader';
import { addNewChat } from '../../redux/slices/inbox';
import { UpdateTab } from '../../redux/slices/app';

const ProfilePage = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const { otherUser, user, isLoading } = useSelector(state => state.user)
    const { addNewChatLoading, newChat } = useSelector(state => state.inbox)
    const theme = useTheme()
    const isDesktop = useResponsive("up", "md");
    const [openModal, setOpenModal] = useState(null);
    const [follow, followLoading, setFollow, handleFollow] = useFollowUser();
    const [openPostDialog, setOpenPostDialog] = useState(false);
    const [selectedPost, setSelectedPost] = useState(null);
    const navigate = useNavigate()
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

    const handleAddNewChat = () => {
        dispatch(addNewChat(otherUser._id))
    }

    const hanldeEditClick = () => {
        navigate('/accounts/edit')
    }

    useEffect(() => {
        if (newChat) {
            const friendId = newChat.users?.find((id) => id !== user._id);
            navigate(`/inbox/t/${newChat._id}/${friendId}`);
        }
    }, [newChat])

    return (
        <> {(otherUser || isLoading) ? (
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
                {/* Header section of Profile */}
                {isLoading ? <ChatLoader loading={isLoading} /> :
                    <>
                        {
                            otherUser && (
                                <Stack alignItems='center' justifyContent='center' spacing={5} direction='row'>
                                    <Avatar sx={{
                                        width: isDesktop ? 150 : 80,
                                        height: isDesktop ? 150 : 80,
                                    }}
                                        src={otherUser.avatar.url}
                                        alt={otherUser.name}
                                    />
                                    <Stack spacing={2} >
                                        <Stack spacing={isDesktop ? 6 : 2} direction='row'>
                                            <Typography variant='h4'>{otherUser.username}</Typography>
                                            {
                                                user._id === otherUser._id ?
                                                    <Button
                                                        onClick={hanldeEditClick}
                                                        sx={{
                                                            color: "common.white",
                                                            background: theme.palette.primary
                                                        }} variant='contained' >Edit Profile</Button> :
                                                    <>
                                                        {follow ?
                                                            <Stack direction={'row'} spacing={1}>
                                                                <LoadingButton loading={addNewChatLoading} onClick={handleAddNewChat} variant='outlined' sx={{ fontSize: 'small', fontWeight: 500, background: theme.palette.primary, }}>Message</LoadingButton>
                                                                <LoadingButton loading={followLoading} onClick={() => handleFollow(otherUser._id)} variant='contained'
                                                                    sx={{
                                                                        fontSize: 'small',
                                                                        fontWeight: 500,
                                                                        background: theme.palette.primary.main,
                                                                        color: "common.white",
                                                                    }}>
                                                                    UnFollow</LoadingButton>
                                                            </Stack> :
                                                            <LoadingButton loading={followLoading} onClick={() => handleFollow(otherUser._id)} variant='contained'
                                                                sx={{
                                                                    fontSize: 'small',
                                                                    fontWeight: 500,
                                                                    background: theme.palette.primary.main,
                                                                    color: "common.white",
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
                            )
                        }
                    </>
                }
                <Divider sx={{ my: 3 }} />
                {/* Post Section */}
                {isLoading ?
                    <Box sx={{ height: "50%", width: "50%" }}>
                        <PostLoading loading={isLoading} />
                    </Box> :
                    <Posts otherUser={otherUser} handlePostClick={handlePostClick} />
                }
            </Box >
        ) : (
            <NotFoundProfile />
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


export default ProfilePage;

const NotFoundProfile = () => {
    const naviagte = useNavigate()
    const dispacth = useDispatch();

    const handleExporeClick = () => {
        naviagte('/users')
        dispacth(UpdateTab({ tab: 1 }))
    }
    return (
        <Stack
            sx={{ width: "100%" }}
            justifyContent={'center'}
            spacing={2}
            alignItems={'center'}
        >
            <Typography variant="h4" color="primary">
                Oops, this profile doesn't exist!
            </Typography>
            <Typography variant="body1" color="textSecondary">
                But don't worry, you can explore other interesting profiles.
            </Typography>
            {/* <img
                src="https://example.com/fun-image.png"
                alt="Fun Image"
                style={funImageStyle}
            /> */}
            <Button
                variant="contained"
                color="primary"
                onClick={handleExporeClick}
            >
                Explore Profiles
            </Button>
        </Stack>
    );
};

const Posts = ({ otherUser, handlePostClick }) => {
    const isDesktop = useResponsive("up", "md");
    return <>
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
    </>
}