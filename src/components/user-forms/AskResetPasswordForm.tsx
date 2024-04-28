import { useState } from "react";
import { useGlobalDataStore } from "../../stores";
import UserFormField from "./UserFormField";
import FormButton from "../common/FormButton";
import '../../assets/sass/common/forms-style.scss';

export default function AskResetPasswordForm() {

    const [emailToCheck, setEmail] = useState('');

    const {hostName} = useGlobalDataStore();

    const sendResetLink = async(e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();

        try {
    
            const response: Response =  await fetch(`${hostName}/passwordRoute/forgot-password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',    
                },
                body: JSON.stringify({
                    email: emailToCheck
                }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data.message)
    
            } else {
                console.error('Error while asking reset email: ', response.statusText);
            }

        } catch (error) {
            console.error('Error while asking reset email :', error);
        }

    } 

    return (
        <form onSubmit={sendResetLink}>
            <UserFormField 
                label="Email address" 
                type="email" 
                name="email" 
                value={emailToCheck} 
                onChange={(e) => setEmail(e.target.value)} 
            />
            <FormButton type="submit" name="Send reset email" className="button"/>
        </form>
    )
}