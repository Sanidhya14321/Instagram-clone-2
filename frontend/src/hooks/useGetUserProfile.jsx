import { setUserProfile } from "@/redux/authSlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const useGetUserProfile = (userId) => {
    const dispatch = useDispatch();
    const userProfile = useSelector((state) => state.auth.userProfile);

    useEffect(() => {
        const controller = new AbortController();

        const fetchUserProfile = async () => {
            if (!userId) return;
            try {
                const res = await axios.get(`http://localhost:8000/api/v1/user/${userId}/profile`, { 
                    withCredentials: true,
                    signal: controller.signal,
                });
                if (res.data.success) { 
                    dispatch(setUserProfile(res.data.user));
                }
            } catch (error) {
                if (axios.isCancel(error)) {
                    console.log("Fetch cancelled:", error.message);
                } else {
                    console.error("Error fetching user profile:", error);
                }
            }
        };

        fetchUserProfile();

        return () => {
            controller.abort();
        };
    }, [userId, dispatch]);

    return userProfile;
};

export default useGetUserProfile;
