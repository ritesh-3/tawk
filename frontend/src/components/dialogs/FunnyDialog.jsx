import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Box, Stack } from '@mui/material';

const FunnyDialog = ({ open, onClose }) => {

    const onCloneAndDevelop = () => {
        window.open("https://github.com/ritesh-3/tawk", "_blank")
    }

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle my={2}>
                <Typography variant="h5" sx={{ textAlign: 'center' }}>
                    Oops! 🤪
                </Typography>
            </DialogTitle>
            <DialogContent>
                <Typography variant="h6" sx={{ textAlign: 'center' }}>
                    It looks like you've stumbled upon the "Dead Buttons Graveyard."
                </Typography>
                <Box my={5}>
                    <Typography variant="body1" sx={{ textAlign: 'center', mt: 2 }}>
                        Remember the wise words of the developer's proverb:
                    </Typography>
                    <Typography variant="subtitle1" sx={{ textAlign: 'center', mt: 2 }}>
                        "To create something new, one must first clone and develop."
                    </Typography>
                </Box>
                <Typography variant="caption" sx={{ textAlign: 'center', mt: 2 }}>
                    Click the button below to start your development journey:
                </Typography>
                <Stack direction={'row'} width={'100%'} spacing={2} justifyContent={'center'} marginTop={2} >
                <Button
                    variant="contained"
                    color="primary"
                    onClick={onCloneAndDevelop}

                >
                    Clone and Develop
                </Button>
                <Button
                    variant="outlined"
                    color="secondary"
                    onClick={onClose}
                >
                    Nah, I'm Good Here
                </Button>
            </Stack>
        </DialogContent>
        </Dialog >
    );
};

export default FunnyDialog;
