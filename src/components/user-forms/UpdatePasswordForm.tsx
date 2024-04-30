import { useState } from "react";
import { validatePassword, validateConfirmPassword } from "../../utils/validateData";
import { updatePassword } from "../../services/authService";
import { useUserStore } from "../../stores";
import { useNavigate } from "react-router-dom";
import UserFormField from "./UserFormField";
import FormButton from "../common/FormButton";
import '../../assets/sass/common/forms-style.scss';

export default function UpdatePasswordForm() {

    const [currentPassword, setCurrentPassword] = useState('');
    const [newUserPassword, setNewUserPassword] = useState('');
    const [confirmNewUserPassword, setConfirmNewUserPassword] = useState('');
    const userStore = useUserStore();
    const navigate = useNavigate();

    const updateUserPassword = async(e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();

        if (!validatePassword(newUserPassword) || !validateConfirmPassword(newUserPassword, confirmNewUserPassword)) {
            console.error('Invalid email or password format');
            return;
        }

        // get the token from localStorage
        const token: string | null = localStorage.getItem('token');
        
        if (!token) {
            console.error('No token found in the localStorage');
            return;
        }

        // decode the token to get the userId
        const tokenParts: string[] = token.split('.');
        // decode the payload part
        const tokenPayload: any = JSON.parse(atob(tokenParts[1]));
        // extract userId from the payload
        const userId: any = tokenPayload.userId;

        try {
            const data = await updatePassword(token, userId, currentPassword, newUserPassword);
            console.log(data.message);
            userStore.logOutUser();
            navigate('/login')

        } catch (error) {
            console.error('Error during updating password: ', error);
        }

    };

    return (
        <form onSubmit={updateUserPassword}>
            <UserFormField 
                label="Type your current password" 
                type="password" 
                name="password" 
                value={currentPassword} 
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="password-input" 
            />
            <UserFormField 
                label="Create a new password" 
                type="password" 
                name="password" 
                value={newUserPassword} 
                onChange={(e) => setNewUserPassword(e.target.value)}
                mention="8 characters, 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character" 
                className="password-input" 
            />
            <UserFormField 
                label="Confirm your new password" 
                type="password" 
                name="confirm-password" 
                value={confirmNewUserPassword} 
                onChange={(e) => setConfirmNewUserPassword(e.target.value)} 
                mention="must be identical to your new password"
                className="password-input" 
            />
            <FormButton type="submit" name="Update your password" />
        </form>
    )
}