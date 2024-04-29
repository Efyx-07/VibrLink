import { useState } from "react";
import UserFormField from "./UserFormField";
import FormButton from "../common/FormButton";
import '../../assets/sass/common/forms-style.scss';
import { validateData, validateConfirmPassword } from "../../utils";
import { useGlobalDataStore } from "../../stores";
import { useNavigate } from "react-router-dom";

export default function SignupForm() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const {hostName} = useGlobalDataStore();
    const navigate = useNavigate();

    const signup = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();

        if (!validateData(email, password) || !validateConfirmPassword(password, confirmPassword)) {
            console.error('Invalid email or password format');
            return;
        }

        try {
            const response = await fetch(`${hostName}/user/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password
                })
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Successfully registered, datas:', data);
                navigate('/login');

            } else {
                console.error('Error during registration:', response.statusText);
            }

        } catch (error){
            console.error('Error during registration:', error);
        }
    }


    return (
        <form onSubmit={signup}>
            <UserFormField 
                label="Email address" 
                type="email" 
                name="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
            />
            <UserFormField 
                label="Create a password" 
                type="password" 
                name="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
                mention="8 characters, 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character" 
                className="password-input" 
            />
            <UserFormField 
                label="Confirm your password" 
                type="password" 
                name="confirm-password" 
                value={confirmPassword} 
                onChange={(e) => setConfirmPassword(e.target.value)} 
                mention="must be identical to your password"
                className="password-input" 
            />
            <FormButton type="submit" name="Sign up" className="button"/>
        </form>
    )
}