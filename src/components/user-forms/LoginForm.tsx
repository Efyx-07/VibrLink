import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useUserStore, useGlobalDataStore } from "../../stores";
import validateData from "../../utils/validateData";
import UserFormField from "./UserFormField";

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
            <UserFormField label="Email" type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <UserFormField label="Password" type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} className="password-input" />
            <button type="submit">Log in</button>
        </form>
    )
};

