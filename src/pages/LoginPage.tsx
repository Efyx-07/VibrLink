import LoginForm from "../components/user-forms/LoginForm";
import '../assets/sass/common/pages-common-styles.scss';
import styles from './LoginPage.module.scss';

export default function LoginPage() {
    return (
        <div className="page">
            <div className={`content ${styles.content}`}>
                <LoginForm />
                <p>I forgot my password</p>
            </div>
        </div>
    )
};

