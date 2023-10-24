import { useState, useEffect } from 'react';
import customLogger from '../utils/logger';
import axiosInstance from '../utils/axios';


function useFollowUser() {
    const [follow, setFollow] = useState(false);
    const [followLoading, setFollowLoading] = useState(false);

    
    const handleFollow = async (id) => {
        try {
            if (id) {
                setFollowLoading(true);
                const response = await axiosInstance.get(`/api/v1/follow/${id}`);
                customLogger.trace("ProfilePage#handleFollow", "Response received..", "", response);
                if (response.data.message === "UNFOLLOWED") {
                    setFollow(false);
                } else {
                    setFollow(true);
                }
                setFollowLoading(false);
            }
        } catch (error) {
            customLogger.error("ProfilePage#handleFollow", "Error response received", "", error);
            setFollowLoading(false);
        }
    };

    return [follow, followLoading, setFollow, handleFollow]
}


export default useFollowUser;
