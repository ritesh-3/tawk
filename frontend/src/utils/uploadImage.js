import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../config';

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export const uploadImage = async (image) => {
    try {
        const user_id = window.localStorage.getItem("user_id");
        if (!user_id) {
            throw new Error('User not identified');
        }
        let imagePath = '';

        imagePath = `images/${user_id}/avatar/`;

        const fileExtension = image.name.split('.').pop(); // Extract the file extension
        const imageName = `myAvatar.${fileExtension}`; // Add the file extension to the name

        const imageRef = ref(storage, `${imagePath}/${imageName}`);
        await uploadBytes(imageRef, image);

        const downloadURL = await getDownloadURL(imageRef);

        return downloadURL;
    } catch (error) {
        console.error(error);
    }
};

export const uploadImages = async (images) => {
    try {
        const user_id = window.localStorage.getItem("user_id");
        if (!user_id) {
            throw new Error('User not identified');
        }

        const imagePath = `images/${user_id}/media`;
        const downloadURLs = [];

        const uploadPromises = images.map(async (image) => {
            const fileExtension = image.file.name.split('.').pop(); // Extract the file extension
            const imageName = `sentImage_${Date.now().toString()}${fileExtension}`; // Generate a unique name with timestamp

            const imageRef = ref(storage, `${imagePath}/${imageName}`);
            await uploadBytes(imageRef, image.file);

            const downloadURL = await getDownloadURL(imageRef);
            downloadURLs.push(downloadURL);
        });

        await Promise.all(uploadPromises); // Wait for all uploads to complete

        return downloadURLs;
    } catch (error) {
        console.error(error);
        throw new Error('Image upload failed')
    }
};
