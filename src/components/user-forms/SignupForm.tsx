import { useState, useEffect } from "react";
import { validateEmail, validatePassword, validateData, validateConfirmPassword } from "../../utils/validateData";
import { useNavigate } from "react-router-dom";
import { register } from "../../services/authService";
import UserFormField from "./UserFormField";
import LoadingSpinner from "../common/LoadingSpinner";
import FormButton from "../common/FormButton";
import '../../assets/sass/common/forms-style.scss';

export default function SignupForm() {

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [isEmailValid, setEmailValid] = useState<boolean>(false);
    const [isPasswordValid, setPasswordValid] = useState<boolean>(false);
    const [isConfirmPasswordValid, setConfirmPasswordValid] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    useEffect(() => {
        setEmailValid(validateEmail(email));
        setPasswordValid(validatePassword(password));
        setConfirmPasswordValid(validateConfirmPassword(password, confirmPassword));
    }, [email, password, confirmPassword]);


    const signup = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        setIsLoading(true);

        if (!validateData(email, password) || !validateConfirmPassword(password, confirmPassword)) {
            console.error('Invalid email or password format');
            return;
        }

        try {
            const data = await register(email, password);
            setIsLoading(false);
            navigate('/login');
            return data;

        } catch (error) {
            setErrorMessage(true);
            setIsLoading(false);
            // if error reset the form after 3s
            setTimeout(() => {
                setErrorMessage(false);
                resetForm();
            }, 3000);
            console.error('Error during registration: ' + error);
        }
    };

    // function to reset the form
    const resetForm = () => {
        setEmail('');
        setPassword('');
        setConfirmPassword('');
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
            {errorMessage && <p className="error-message">This email already exists !</p>}
            {isLoading ? (
                <div className="spinner-container">
                    <LoadingSpinner />
                </div>
            ) : <FormButton type="submit" name="Sign up" />}
        </form>
    )
}