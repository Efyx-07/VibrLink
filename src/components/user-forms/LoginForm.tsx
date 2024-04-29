import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useUserStore } from "../../stores";
import { validateData } from "../../utils";
import { login } from "../../services/authService";
import UserFormField from "./UserFormField";
import FormButton from "../common/FormButton";
import '../../assets/sass/common/forms-style.scss';

export default function LoginForm() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const userStore = useUserStore();
    const navigate = useNavigate();

    const userLogin = async(e: React.FormEvent<HTMLFormElement>): Promise <void> => {
        e.preventDefault();

        if (!validateData(email, password)) {
            console.error('Invalid email or password format');
            return;
        }

        try {
            const data = await login(email, password);
            console.log(data.message);
            userStore.setUserData(data.user);

            const token = data.token;
            localStorage.setItem('token', token);
            userStore.setToken(token);

            navigate('/');

        } catch (error) {
            console.error('Error while connecting: ', error);
        }
    };

    return (
        <form onSubmit={userLogin}>
            <UserFormField 
                label="Email address" 
                type="email" 
                name="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
            />
            <UserFormField 
                label="Enter your password" 
                type="password" 
                name="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                className="password-input" 
            />
            <FormButton type="submit" name="Log in" />
        </form>
    )
};

