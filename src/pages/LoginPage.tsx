import LoginForm from "../components/user-forms/LoginForm";
import Separator from "../components/common/Separator";
import '../assets/sass/common/pages-common-styles.scss';
import styles from './LoginPage.module.scss';

export default function LoginPage() {
    return (
        <div className="page">
            <div className={`content ${styles.content}`}>
                <LoginForm />
                <Separator />
                <p>I forgot my password</p>
            </div>
        </div>
    )
};

