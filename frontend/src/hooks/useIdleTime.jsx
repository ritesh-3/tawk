import { useEffect, useRef } from "react";
import { getSocket } from "../socket";

const startIdleTimer = (user_id, inactivityTimeout = 30000) => {
    const inactivityTimerRef = useRef(null);
    const activityTimerRef = useRef(null);

    const resetInactivityTimer = () => {
        clearTimeout(inactivityTimerRef.current);
        inactivityTimerRef.current = setTimeout(() => {
            // Emit an event to the server to update the user's status to "Offline"
            getSocket().emit("set_offline", { user_id });
        }, inactivityTimeout);
    };

    const resetActivityTimer = () => {
        clearTimeout(activityTimerRef.current);
        activityTimerRef.current = setTimeout(resetInactivityTimer, inactivityTimeout);
    };

    const handleUserActivity = () => {
        resetActivityTimer();
    };

    useEffect(() => {
        // Add event listeners for user interactions
        const userInteractions = ["click", "keydown", "touchstart"];
        userInteractions.forEach((event) => {
            window.addEventListener(event, handleUserActivity);
        });

        resetInactivityTimer();

        return () => {
            clearTimeout(inactivityTimerRef.current);
            clearTimeout(activityTimerRef.current);
            userInteractions.forEach((event) => {
                window.removeEventListener(event, handleUserActivity);
            });
        };
    }, [user_id, inactivityTimeout]);
};

export default startIdleTimer;
