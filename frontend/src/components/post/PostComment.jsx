import { Box, IconButton, Stack, TextField, styled, useTheme } from '@mui/material';
import { PaperPlaneTilt, Spinner } from 'phosphor-react';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addComment } from '../../redux/slices/postSlice';

const StyledInput = styled(TextField)(({ theme }) => ({
    "& .MuiInputBase-input": {
        paddingTop: "8px !important",
        paddingBottom: "8px !important",
    },
}));

const PostComment = ({ postId }) => {
    const theme = useTheme();
    const [comment, setComment] = useState("");
    const { commentLoading } = useSelector(state => state.posts)
    const dispatch = useDispatch();

    const postComment = () => {
        setComment("")
        if (postId && comment) {
            dispatch(addComment({ postId, comment }))
            //Callback
            // onPostComment()
        }
    }

    return (
        <Stack sx={{ width: '100%' }} alignItems={'center'} direction={'row'} spacing={0.5}>
            <StyledInput
                value={comment}
                onChange={(event) => {
                    setComment(event.target.value);
                }}
                fullWidth
                placeholder="Write a comment..."
                variant="outlined"
            />
            <Box
                sx={{
                    height: 38,
                    width: 38,
                    backgroundColor: theme.palette.primary.main,
                    borderRadius: 1.5,
                }}
            >
                <Stack
                    sx={{ height: "100%" }}
                    alignItems={"center"}
                    justifyContent="center"
                >
                    <IconButton
                        onClick={postComment}
                    >
                        {
                            commentLoading ?
                                <Spinner color='#ffff' /> :
                                <PaperPlaneTilt color="#ffffff" />
                        }
                    </IconButton>
                </Stack>
            </Box>

        </Stack>
    )
}

export default PostComment
