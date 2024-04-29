import { useState } from "react";
import UserFormField from "./UserFormField";
import FormButton from "../common/FormButton";
import '../../assets/sass/common/forms-style.scss';

export default function SignupForm() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');


    return (
        <form>
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