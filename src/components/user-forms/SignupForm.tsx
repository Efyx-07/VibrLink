import { useState, useEffect } from "react";
import { validateEmail, validatePassword, validateData, validateConfirmPassword } from "../../utils/validateData";
import { useNavigate } from "react-router-dom";
import { register } from "../../services/authService";
import UserFormField from "./UserFormField";
import FormButton from "../common/FormButton";
import '../../assets/sass/common/forms-style.scss';


export default function SignupForm() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isEmailValid, setEmailValid] = useState(false);
    const [isPasswordValid, setPasswordValid] = useState(false);
    const [isConfirmPasswordValid, setConfirmPasswordValid] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setEmailValid(validateEmail(email));
        setPasswordValid(validatePassword(password));
        setConfirmPasswordValid(validateConfirmPassword(password, confirmPassword));
    }, [email, password, confirmPassword]);


    const signup = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();

        if (!validateData(email, password) || !validateConfirmPassword(password, confirmPassword)) {
            console.error('Invalid email or password format');
            return;
        }

        try {
            const data = await register(email, password);
            navigate('/login');
            return data;

        } catch (error) {
            console.error('Error during registration: ' + error);
        }
    };
    
    return (
        <form onSubmit={signup}>
            <UserFormField 
                label="Email address" 
                type="email" 
                name="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
                isValid={isEmailValid}
            />
            <UserFormField 
                label="Create a password" 
                type="password" 
                name="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
                mention="8 characters, 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character" 
                className="password-input" 
                isValid={isPasswordValid}
            />
            <UserFormField 
                label="Confirm your password" 
                type="password" 
                name="confirm-password" 
                value={confirmPassword} 
                onChange={(e) => setConfirmPassword(e.target.value)} 
                mention="must be identical to your password"
                className="password-input" 
                isValid={isConfirmPasswordValid && !!confirmPassword}
            />
            <FormButton type="submit" name="Sign up" />
        </form>
    )
}