import React, { useState } from "react";
import useAuthStore from "../zustand/useAuthStore";


const Register = () => {

    const [email, setEmail] = useState('');
    const [age, setAge] = useState('');
    const [password, setPassword] = useState('');

    const { registerUser } = useAuthStore.getState();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('email', email);
        formData.append('age', age);
        formData.append('password', password);
        await registerUser(formData);
    }

    return (
        <div className="main-container">

            <div className="title-container">
                <h1>Register Page</h1>
            </div>

            <form className="form-container" onSubmit={handleSubmit}>
                <label htmlFor="email">Email:</label>
                <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}/>
                <label htmlFor="">Age:</label>
                <input type="number" name="" id="" value={age} onChange={(e) => setAge(e.target.value)}/>
                <label htmlFor="">Password:</label>
                <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)}/>
                <button type="submit" className="submit-btn">SUBMIT</button>
            </form>

        </div>
    )
}

export default Register;
