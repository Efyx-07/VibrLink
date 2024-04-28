import LoginForm from "../components/user-forms/LoginForm";
import '../assets/sass/common/pagesCommonStyle.scss';
import './LoginPage.scss';

export default function LoginPage() {
    return (
        <div className="page">
            <div className="content">
                <LoginForm />
                <p>I forgot my password</p>
            </div>
        </div>
    )
};

