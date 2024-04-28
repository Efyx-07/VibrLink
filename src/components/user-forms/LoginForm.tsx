import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useUserStore, useGlobalDataStore } from "../../stores";
import validateData from "../../utils/validateData";

export default function LoginForm() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const userStore = useUserStore();
    const {hostName} = useGlobalDataStore();
    const navigate = useNavigate();

    const userLogin = async(e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();

        if (!validateData(email, password)) {
            console.error('Invalid email or password format');
            return;
        }

        try {

            const response: Response = await fetch(`${hostName}/user/login`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password
                }) 
            });
            
            if (response.ok) {
                const data = await response.json();
                console.log(data.message);
                userStore.setUserData(data.user);

                const token = data.token;
                localStorage.setItem('token', token);
                userStore.setToken(token);
                navigate('/')
            } else {
                console.error('Error while connecting: ', response.statusText);
            }

        } catch (error) {
            console.error('Error while connecting: ', error);
        }
    }

    return (
        <form onSubmit={userLogin}>
            <div className="input-container">
                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="userlogin_email" value={email} onChange={(e) => setEmail(e.target.value)}/>
            </div>
            <div className="input-container">
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="userlogin_password" className="password-input" value={password} onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <button type="submit">Log in</button>
        </form>
    )
};

