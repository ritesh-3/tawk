export const ResetApp = () => {
    window.localStorage.clear();
    window.location.reload();

}

export function randomID(len) {
    let result = '';
    if (result) return result;
    var chars = '12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP',
        maxPos = chars.length,
        i;
    len = len || 5;
    for (i = 0; i < len; i++) {
        result += chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return result;
}




export const formatChatTime = (timestamp) => {
    const msgDate = new Date(timestamp);
    const currentDate = new Date();
    const timeDifference = (currentDate - msgDate) / 60000; // Calculate the time difference in minutes

    // Check if the message was sent "just now" (within a minute)
    if (timeDifference < 1) {
        return 'just now';
    }

    // Check if the message was sent within the last 10 minutes
    if (timeDifference < 10) {
        return `${Math.floor(timeDifference)} minutes ago`;
    }

    // Check if the message date is today
    if (
        msgDate.getDate() === currentDate.getDate() &&
        msgDate.getMonth() === currentDate.getMonth() &&
        msgDate.getFullYear() === currentDate.getFullYear()
    ) {
        return `Today, ${msgDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    }

    // Check if the message date is yesterday
    const yesterday = new Date(currentDate);
    yesterday.setDate(yesterday.getDate() - 1);
    if (
        msgDate.getDate() === yesterday.getDate() &&
        msgDate.getMonth() === yesterday.getMonth() &&
        msgDate.getFullYear() === yesterday.getFullYear()
    ) {
        return `Yesterday, ${msgDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    }

    // If it's neither today nor yesterday, show the full date
    return msgDate.toLocaleDateString([], {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });
};

export const optimizeImage = async (imageDataUrl) => {
    const img = new Image();
    img.src = imageDataUrl;

    // Set the desired maximum width and height
    const maxWidth = 800;
    const maxHeight = 800;

    return await new Promise((resolve) => {
        img.onload = () => {
            const width = img.width;
            const height = img.height;

            // Calculate the new width and height while maintaining the aspect ratio
            let newWidth = width;
            let newHeight = height;

            if (width > maxWidth || height > maxHeight) {
                const aspectRatio = width / height;

                if (width > maxWidth) {
                    newWidth = maxWidth;
                    newHeight = maxWidth / aspectRatio;
                }

                if (newHeight > maxHeight) {
                    newHeight = maxHeight;
                    newWidth = maxHeight * aspectRatio;
                }

                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                canvas.width = newWidth;
                canvas.height = newHeight;
                ctx.drawImage(img, 0, 0, newWidth, newHeight);
                resolve(canvas.toDataURL('image/jpeg', 0.8)); // Convert to JPEG for optimization
            } else {
                resolve(imageDataUrl);
            }
        };
    });
}

