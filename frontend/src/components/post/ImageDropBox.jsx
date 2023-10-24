import React, { useState } from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import { X } from 'phosphor-react';

const ImageDropBox = ({ onImageUpload }) => {
    const [isDragging, setIsDragging] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);


    const handleDrop = (e) => {
        e.preventDefault();
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            const file = files[0];
            setSelectedImage(URL.createObjectURL(file));
        }
        onImageUpload(files);
        setIsDragging(false);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleFileInput = (e) => {
        const files = e.target.files;
        if (files.length > 0) {
            const file = files[0];
            setSelectedImage(URL.createObjectURL(file));
        }
        onImageUpload(files);
    };

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            maxHeight='450px'
            sx={{
                border: `2px dashed ${selectedImage ? 'transparent' : '#ced4da'}`,
                backgroundColor: 'white',
                cursor: 'pointer',
                minHeight: '200px',
                padding: '20px',
            }}
        >
            {
                selectedImage && (
                    <IconButton sx={{ position: 'absolute', right:10, top:'60px' }} onClick={() => setSelectedImage(null)}>
                        <X size={24} />
                    </IconButton>
                )
            }
            {selectedImage ? (
                <img src={selectedImage} alt="Preview" style={{ height: '420px', borderRadius: '6px' }} />
            ) : isDragging ? (
                <Typography variant="subtitle1">Drop the image here</Typography>
            ) : (
                <div>
                    <Typography variant="subtitle1">Drag & drop an image here or</Typography>
                    <label htmlFor="imageInput">
                        <Typography variant="subtitle1" color="primary" style={{ cursor: 'pointer' }}>
                            click to select
                        </Typography>
                    </label>
                    <input
                        type="file"
                        id="imageInput"
                        accept="image/*"
                        style={{ display: 'none' }}
                        onChange={handleFileInput}
                    />
                </div>
            )}
        </Box>
    );
};

export default ImageDropBox;
