import { useState } from "react";
import { sendResetLink } from "../../services/authService";
import UserFormField from "./UserFormField";
import FormButton from "../common/FormButton";
import '../../assets/sass/common/forms-style.scss';

export default function AskResetPasswordForm() {

    const [emailToCheck, setEmail] = useState('');

    const askResetLink = async(e: React.FormEvent<HTMLFormElement>): Promise <void> => {
        e.preventDefault();

        try {
            const data = await sendResetLink(emailToCheck);
            console.log(data.message);

        } catch (error) {
            console.error('Error while asking reset email :', error);
        }
    };

    return (
        <form onSubmit={askResetLink}>
            <UserFormField 
                label="Email address" 
                type="email" 
                name="email" 
                value={emailToCheck} 
                onChange={(e) => setEmail(e.target.value)} 
            />
            <FormButton type="submit" name="Send reset email" />
        </form>
    )
}