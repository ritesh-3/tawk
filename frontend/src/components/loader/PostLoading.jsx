import * as React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Skeleton from '@mui/material/Skeleton';

const PostLoading = ({ loading = false }) => {

    return (
        <>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ margin: 1 }}>
                    <Skeleton variant="circular">
                        <Avatar />
                    </Skeleton>
                </Box>
                <Box sx={{ width: '100%' }}>
                    <Skeleton width="100%">
                        <Typography>.</Typography>
                    </Skeleton>
                </Box>
            </Box>
            <Skeleton variant="rectangular" width="100%">
                <Box style={{ paddingTop: '40%' }} />
            </Skeleton>
        </>
    );
}

export default PostLoading