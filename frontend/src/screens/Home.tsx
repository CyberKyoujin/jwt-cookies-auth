import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../zustand/useAuthStore";


const Home = () => {

    const navigate = useNavigate();

    const { user, fetchUserData, logoutUser } = useAuthStore.getState();

    useEffect(() => {
        fetchUserData();
    }, [])

    return (
        <div className="main-container">
            <div className="title-container">
                <h1>Home Page</h1>
            </div>

            <div className="user-info-container">
                <p>Hi, {user?.email}</p>
                <button className="logout-btn" onClick={() => logoutUser()}>LOGOUT</button>
            </div>

            <div className="content-container">
                <button onClick={() => navigate('/register')}>Register</button>
                <button onClick={() => navigate('/login')}>Login</button>
                <button onClick={() => navigate('/profile')}>Profile</button>
            </div>
        </div>
    )
}

export default Home;