import { Helmet, HelmetProvider } from 'react-helmet-async';
import FormPageMessage from "../components/common/FormPageMessage";
import StyledSeparator from "../components/common/StyledSeparator";
import SignupForm from '../components/user-forms/SignupForm';
import '../assets/sass/common/pages-common-styles.scss';

export default function SignupPage() {

    const mainTextPrimary: string = 'Create';
    const mainTextSecondary: string = ' a free account';
    const subText: string = 'Let\'s get started and enjoy using our service by creating your account. It\'s free !';

    return (
        <HelmetProvider>
            <Helmet>
                {/* specific SEO part */}
                <title>VibrLink | Sign up</title>
            </Helmet>
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
        </HelmetProvider>
    )
};
