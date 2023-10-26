import { Avatar, Box, Dialog, Grid, IconButton, Link, Paper, Slide, Stack, TextField, Typography, styled, useTheme } from '@mui/material'
import React, { useState } from 'react'
import { Link as RouterLink } from 'react-router-dom';
import { Trash, X } from "phosphor-react"
import useResponsive from '../../hooks/useResponsive';
import PostComment from '../post/PostComment';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


const StyledInput = styled(TextField)(({ theme }) => ({
    "& .MuiInputBase-input": {
        paddingTop: "8px !important",
        paddingBottom: "8px !important",
    },
}));

const Header = ({ postedBy, setOpenPostDialog }) => {
    return <Stack
        sx={{ width: '100%' }}
        direction='row'
        justifyContent='space-between' >
        <Stack direction={'row'} spacing={2} alignItems={'center'}>
            <Avatar sx={{ width: '30px', height: '30px' }} src={postedBy.avatar.url} />
            <Link component={RouterLink} to={`/${postedBy.username}`} >{postedBy.username}</Link>
        </Stack>
        <IconButton >
            <X onClick={() => { setOpenPostDialog(false) }} />
        </IconButton>
    </Stack>
}

export const Comment = ({ cmt }) => {
    const theme = useTheme();

    return <Paper elevation={3} sx={{
        margin: '8px', padding: '8px 12px',
        background: theme.palette.mode === "light"
            ? "#F0F4FA"
            : theme.palette.background.default,
    }}>

        <Box display='flex' alignItems='center'>
            <Avatar sx={{ width: 30, height: 30 }} src={cmt.user.avatar.url} />
            <Link variant='caption' component={RouterLink} to={`/${cmt.user.username}`} style={{ marginLeft: '8px' }}>
                {cmt.user.username}
            </Link>
        </Box>
        <Typography mt={1} fontSize={14} >{cmt.comment}</Typography>
    </Paper>
};

export const Comments = ({ comments, maxHeight }) => (
    <Box
        maxHeight={maxHeight}
        sx={{ width: '100%' }}
        overflow='auto'
        display='flex'
        flexDirection='column'
    >
        {comments.map((cmt) => (
            <Comment key={cmt._id} cmt={cmt} />
        ))}
    </Box>
);


const PostDialog = ({ open, onClose, selectedPost, setOpenPostDialog }) => {
    const { _id, caption, likes, comments, image, postedBy, savedBy, createdAt } = selectedPost;
    const isDesktop = useResponsive("up", "md");

    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullWidth maxWidth="sm">
            <Box display="flex" flexDirection={isDesktop ? 'row' : 'column'} width="100%">
                <Stack p={2} spacing={2} width={isDesktop ? '60%' : '100%'}>
                    <Header setOpenPostDialog={setOpenPostDialog} postedBy={postedBy} />
                    <Box >
                        <Typography variant="body1" paragraph>
                            {caption}
                        </Typography>
                        <img
                            src={image.url}
                            alt="Post"
                            style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
                        />
                    </Box>
                    <PostComment postId={_id} />
                </Stack>
                {(comments && comments.length > 0) &&
                    <Box width={isDesktop ? '40%' : '100%'} mt={isDesktop ? 3 : 0} >
                        <Comments comments={comments} maxHeight={'420px'} />
                    </Box>
                }
            </Box>
        </Dialog>
    )
}

export default PostDialog
