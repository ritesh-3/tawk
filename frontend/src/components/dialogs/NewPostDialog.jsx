import { Dialog, Slide, Link, Avatar, Stack, Typography, Box, useTheme, styled, TextField, TextareaAutosize, Button, LinearProgress } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import ImageDropBox from '../post/ImageDropBox';
import { showSnackbar } from '../../redux/slices/app';
import { addNewPost } from '../../redux/slices/postSlice';
import { optimizeImage } from '../../utils/utils';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const StyledInput = styled(TextField)(({ theme }) => ({
    "& .MuiInputBase-input": {
        paddingTop: "8px !important",
        paddingBottom: "8px !important",
    },
}));


const NewPostDialog = ({ open, onClose }) => {
    const { user } = useSelector((state) => state.user);
    const { newPostLoading } = useSelector(state => state.posts)
    const [caption, setCaption] = useState("");
    const [selctedImage, setSelctedImage] = useState(null);
    const theme = useTheme();
    const dispatch = useDispatch();

    const handleImage = (files) => {
        if (files) {
            const reader = new FileReader();
            reader.onload = async () => {
                if (reader.readyState === 2) {
                    const optimizedImage = await optimizeImage(reader.result);
                    setSelctedImage(optimizedImage)
                }
            };
            reader.readAsDataURL(files[0]);
        }
    }

    const newPost = () => {
        if (selctedImage) {
            const formData = new FormData()
            formData.set("caption", caption);
            formData.set("post", selctedImage);
            dispatch(addNewPost(formData));

        } else {
            dispatch(showSnackbar({ severity: 'warning', message: 'Please select image first' }))
        }
    }

    return (
        <Dialog
            fullWidth
            maxWidth='sm'
            open={open}
            onClose={onClose}
            TransitionComponent={Transition}
        >
            <Stack p={2} spacing={2}>
                <Stack direction='row' justifyContent={'space-between'} alignItems={'center'}>
                    <Stack direction={'row'} spacing={2} alignItems={'center'}>
                        <Avatar sx={{ width: '30px', height: '30px' }} src={user.avatar.url} />
                        <Link component={RouterLink} to={`/${user.username}`} >{user.username}</Link>
                    </Stack>
                    <Typography variant='h5' >New Post</Typography>
                </Stack>
                {newPostLoading && <LinearProgress />}
                <ImageDropBox onImageUpload={handleImage} />

                {/* Captions section */}
                <Stack sx={{ width: '100%' }} alignItems={'center'} direction={'row'} spacing={0.5}>
                    <StyledInput
                        value={caption}
                        onChange={(event) => {
                            setCaption(event.target.value);
                        }}
                        fullWidth
                        placeholder="Caption..."
                        variant="outlined"
                    />
                    <Button
                        onClick={newPost}
                    >
                        Post
                    </Button>
                </Stack>
            </Stack>
        </Dialog>
    )
}

export default NewPostDialog
