import { useState } from "react";
import UserFormField from "./UserFormField";
import FormButton from "../common/FormButton";
import '../../assets/sass/common/forms-style.scss';

export default function UpdatePasswordForm() {

    const [currentPassword, setCurrentPassword] = useState('');
    const [newUserPassword, setNewUserPassword] = useState('');
    const [confirmNewUserPassword, setConfirmNewUserPassword] = useState('');

    const updatePassword = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();

        
    }

    
    return (
        <form onSubmit={updatePassword}>
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