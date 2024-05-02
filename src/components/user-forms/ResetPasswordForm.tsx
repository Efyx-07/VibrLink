import { useState } from "react";
import { useParams } from "react-router-dom";
import { validatePassword, validateConfirmPassword } from "../../utils/validateData";
import { resetPassword } from "../../services/authService";
import { useNavigate } from "react-router-dom";
import UserFormField from "./UserFormField";
import FormButton from "../common/FormButton";
import '../../assets/sass/common/forms-style.scss';

export default function ResetPasswordForm() {

    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');

    const {token} = useParams();
    const navigate = useNavigate();

    const resetUserPassword = async(e: React.FormEvent<HTMLFormElement>): Promise <void> => {
        e.preventDefault();

        if (!validatePassword(newPassword) || !validateConfirmPassword(newPassword, confirmNewPassword)) {
            console.error('Invalid password format');
            return;
        }

        try {

            if (!token) {
                console.error('Token is undefined');
                return;
            }

            await resetPassword(token, newPassword);
            navigate('/login');
            
        } catch (error) {
            console.error('Erreur lors de la réinitialisation du mot de passe: ', error);
        }
    };

    return (
        <form onSubmit={resetUserPassword}>
            <UserFormField 
                label="Create a new password" 
                type="password" 
                name="password" 
                value={newPassword} 
                onChange={(e) => setNewPassword(e.target.value)}
                mention="8 characters, 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character" 
                className="password-input" 
            />
            <UserFormField 
                label="Confirm your new password" 
                type="password" 
                name="confirm-password" 
                value={confirmNewPassword} 
                onChange={(e) => setConfirmNewPassword(e.target.value)} 
                mention="must be identical to your new password"
                className="password-input" 
            />
            <FormButton type="submit" name="Reset your password" />
        </form>
    )
}