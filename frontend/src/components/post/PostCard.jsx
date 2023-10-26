import * as React from 'react';
import { styled } from '@mui/material/styles';
import { Comment, Comments } from '../dialogs/PostDialog';
import { Card, CardHeader, CardMedia, CardContent, CardActions, Collapse, Avatar, IconButton, Typography, Box, Stack } from '@mui/material'
import { CaretDown, DotsThreeOutlineVertical, Heart, PaperPlaneTilt, } from 'phosphor-react';
import { formatChatTime } from '../../utils/utils';
import PostComment from './PostComment';
import { useTheme } from '@mui/material'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from '../../utils/axios'
import { likePost } from '../../redux/slices/postSlice';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

export default function PostCard({ _id, caption, likes, comments, image, postedBy, savedBy, createdAt }) {
    const [allLikes, setAllLikes] = useState(likes);
    const [allComments, setAllComments] = useState(comments);

    const { commentSuccess } = useSelector(state => state.posts)
    const [liked, setLiked] = useState(false);
    const [saved, setSaved] = useState(false);
    const { user } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [expanded, setExpanded] = React.useState(false);
    const theme = useTheme();
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const handleLike = async () => {
        setLiked(!liked);
        dispatch(likePost(_id));
        const { data } = await axios.get(`/api/v1/post/detail/${_id}`)
        setAllLikes(data.post.likes)
    }


    //To update the comments on successfull addition
    useEffect(() => {
        if (commentSuccess) {
            axios.get(`/api/v1/post/detail/${_id}`).then(
                resp => setAllComments(resp.data.post.comments)
            )
        }
    }, [commentSuccess])


    useEffect(() => {
        setLiked(allLikes.some((u) => u._id === user._id))
    }, [allLikes]);


    return (
        <Card
            sx={{
                background: theme.palette.mode === "light"
                    ? "#F0F4FA"
                    : theme.palette.background.paper,
            }}
        >
            <CardHeader

                avatar={
                    <Avatar onClick={() => navigate(`/${postedBy.username}`)} src={postedBy.avatar.url} />
                }
                action={
                    <IconButton color='primary'>
                        <DotsThreeOutlineVertical />
                    </IconButton>
                }
                title={postedBy.name}
                subheader={formatChatTime(createdAt)}
            />
            <Box sx={{ width: '100%', mt: 2 }}>
                <img
                    style={{ margin: 'auto', borderRadius: '6px' }}
                    component="img"
                    width="394"
                    // width='auto'
                    src={image.url}
                    alt='My Post'
                />
            </Box>
            {caption &&
                <CardContent sx={{ py: 1 }}>
                    <Typography variant="body2" color="text.secondary">
                        {caption}
                    </Typography>
                </CardContent>
            }
            <CardActions disableSpacing>
                <IconButton color='primary' onClick={handleLike}>
                    <Heart weight={liked ? 'fill' : 'regular'} />
                </IconButton>
                <IconButton  >
                    <PaperPlaneTilt />
                </IconButton>

                <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <CaretDown />
                </ExpandMore>
            </CardActions>
            <Stack px={2} direction={'row'} justifyContent={'space-between'}>
                <Typography variant="body2" color="text.secondary" >{allLikes.length} Likes</Typography>
                <Typography variant="body2" color="text.secondary" >{allComments.length} Comments</Typography>
            </Stack>
            {
                !expanded && (
                    <Box sx={{ p: 1 }}>
                        <PostComment postId={_id} />
                    </Box>)
            }
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Comments comments={allComments} />
                </CardContent>
            </Collapse>
        </Card >
    );
}