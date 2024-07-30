import React, { useEffect } from "react";
import useAuthStore from "../zustand/useAuthStore";

const Profile = () => {

    const { fetchUserData, user } = useAuthStore.getState();

    useEffect(() => {
        fetchUserData();
    }, []);

    return (
        <div>
            <h1>Email: {user?.email}</h1>
            <h1>Age: {user?.age}</h1>
        </div>
    )
}

export default Profile;