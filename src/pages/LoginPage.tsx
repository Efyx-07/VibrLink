import LoginForm from "../components/user-forms/LoginForm";
import '../assets/sass/common/pages-common-styles.scss';
import './LoginPage.scss';

export default function LoginPage() {
    return (
        <div className="page">
            <div className="content">
                <div className="form-container">
                    <LoginForm />
                    <p className="option">I forgot my password</p>
                </div>
            </div>
        </div>
    )
};

