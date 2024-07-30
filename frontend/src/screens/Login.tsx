import React from "react";
import { useState } from "react";
import useAuthStore from "../zustand/useAuthStore";

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { loginUser } = useAuthStore.getState();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await loginUser(email, password);
    }

    return (
        <div className="main-container">
            <div className="title-container">
                <h1>Login</h1>
            </div>

            <form action="" className="form-container" onSubmit={handleSubmit}>

                <label htmlFor="email">Email:</label>
                <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}/>
                <label htmlFor="">Password:</label>
                <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)}/>
                <button type="submit" className="submit-btn">SUBMIT</button>
            </form>
        </div>
    )
}

export default Login;