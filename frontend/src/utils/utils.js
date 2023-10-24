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

    // Check if the message date is today
    if (
        msgDate.getDate() === currentDate.getDate() &&
        msgDate.getMonth() === currentDate.getMonth() &&
        msgDate.getFullYear() === currentDate.getFullYear()
    ) {
        return msgDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
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
