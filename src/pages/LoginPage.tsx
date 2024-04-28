import LoginForm from "../components/user-forms/LoginForm";
import '../assets/sass/common/pagesCommonStyle.scss';

export default function LoginPage() {
    return (
        <div className="page">
            <div className="content">
                <LoginForm />
            </div>
        </div>
    )
};

