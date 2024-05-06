import { useState } from "react";
import { sendResetLink } from "../../services/authService";
import UserFormField from "./UserFormField";
import LoadingSpinner from "../common/LoadingSpinner";
import FormButton from "../common/FormButton";
import '../../assets/sass/common/forms-style.scss';

export default function AskResetPasswordForm() {

    const [emailToCheck, setEmail] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [hasSucceed, setHasSucceed] = useState<boolean>(false);

    const askResetLink = async(e: React.FormEvent<HTMLFormElement>): Promise <void> => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const data = await sendResetLink(emailToCheck);
            setIsLoading(false);
            setHasSucceed(true);
            setTimeout(() => {
                setHasSucceed(false)
                resetForm();
            }, 3000);
            return data;

        } catch (error) {
            setErrorMessage(true);
            setIsLoading(false);
            console.error('Error while asking reset email :', error);
        }
    };

    // function to reset the form
    const resetForm = () => {
        setEmail('');
    };

    return (
        <>
        { hasSucceed ? (
                <p>A reset email has been sent to your address</p>
            )
            :
            (
                <form onSubmit={askResetLink}>
                    <UserFormField 
                        label="Email address" 
                        type="email" 
                        name="email" 
                        value={emailToCheck} 
                        onChange={(e) => setEmail(e.target.value)} 
                    />
                    {errorMessage && <p className="error-message">Email unknown !</p>}
                    {isLoading ? (
                        <div className="spinner-container">
                            <LoadingSpinner />
                        </div>
                    ) : <FormButton type="submit" name="Send reset email" />}
                </form>
            )
        } 
        </>     
    )
}