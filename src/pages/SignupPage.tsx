import '../assets/sass/common/pages-common-styles.scss';
import FormPageMessage from "../components/common/FormPageMessage";
import StyledSeparator from "../components/common/StyledSeparator";
import SignupForm from '../components/user-forms/SignupForm';

export default function SignupPage() {

    const mainTextPrimary: string = 'Create';
    const mainTextSecondary: string = ' a free account';
    const subText: string = 'Let\'s get started and enjoy using our service by creating your account. It\'s free !';

    return (
        <div className='page'>
            <div className="content">
                <div className="message-and-form-container">
                    <FormPageMessage mainTextPrimary={mainTextPrimary} mainTextSecondary={mainTextSecondary} subText={subText} />
                    <StyledSeparator icon="simple-icons:freepik" />
                    <div className="form-container">
                        <SignupForm />
                    </div>
                </div>
            </div>
        </div>
    )
};
