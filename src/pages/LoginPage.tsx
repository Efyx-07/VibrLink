import LoginForm from "../components/user-forms/LoginForm";
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
    return (
        <div className="page">
            <div className="content">
                {
                    isLoginFormVisible ?

                    <div className="form-container">
                        <LoginForm />
                        <p className="option" onClick={hideLoginForm}>I forgot my password</p>
                    </div>
                :
                    <div className="form-container">
                        Je suis Form 2
                        <p className="option" onClick={showLoginForm}>Back to sign in</p>
                    </div>
                }    
            </div>
        </div>
    )
};

