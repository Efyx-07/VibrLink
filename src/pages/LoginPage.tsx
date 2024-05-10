import LoginForm from "../components/user-forms/LoginForm";
import AskResetPasswordForm from "../components/user-forms/AskResetPasswordForm";
import FormPageMessage from "../components/common/FormPageMessage";
import StyledSeparator from "../components/common/StyledSeparator";
import '../assets/sass/common/pages-common-styles.scss';
import './LoginPage.scss';
import { useState } from "react";

export default function LoginPage() {

    const [isLoginFormVisible, setIsLoginFormVisible] = useState(true);

    const hideLoginForm = () => {
        setIsLoginFormVisible(false)
    };

    const showLoginForm = () => {
        setIsLoginFormVisible(true)
    };

    const mainTextPrimary: string = 'Happy';
    const mainTextSecondary: string = ' to see you again';
    const subText: string = 'Login to your account and manage all your vibrlinks or just create a new one !';

    const mainTextPrimary2: string = 'Oops';
    const mainTextSecondary2: string = ' it seems you forgot your password';
    const subText2: string = 'Don\t worry, if your email exists in our database, we\'ll send you a reset link to choose anothe one !';

    return (
        <div className="page">
            <div className="content">
                {
                    isLoginFormVisible ?

                    <div className="message-and-form-container">
                        <FormPageMessage mainTextPrimary={mainTextPrimary} mainTextSecondary={mainTextSecondary} subText={subText} />
                        <StyledSeparator icon="uiw:login" />
                        <div className="form-container">
                            <LoginForm />
                            <p className="option" onClick={hideLoginForm}>I forgot my password</p>
                        </div>
                    </div>
                    
                :
                    <div className="message-and-form-container">
                        <FormPageMessage mainTextPrimary={mainTextPrimary2} mainTextSecondary={mainTextSecondary2} subText={subText2} />
                        <StyledSeparator icon="emojione-monotone:face-screaming-in-fear" />
                        <div className="form-container">
                            <AskResetPasswordForm />
                            <p className="option" onClick={showLoginForm}>Back to sign in</p>
                        </div>
                    </div>
                }    
            </div>
        </div>
    )
};

