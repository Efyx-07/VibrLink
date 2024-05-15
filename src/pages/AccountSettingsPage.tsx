import { Helmet, HelmetProvider } from 'react-helmet-async';
import FormPageMessage from "../components/common/FormPageMessage";
import StyledSeparator from "../components/common/StyledSeparator";
import UpdatePasswordForm from "../components/user-forms/UpdatePasswordForm";

export default function AccountSettingsPage() {

    const mainTextPrimary: string = 'Security';
    const mainTextSecondary: string = ' first';
    const subText: string = 'It seems you need to update your password, choose a unique one to improve your security !';

    return (
        <HelmetProvider>
            <Helmet>
                {/* specific SEO part */}
                <title>VibrLink | Account settings</title>
            </Helmet>
            <div className="page">
                <div className="content">
                    <div className="message-and-form-container">
                        <FormPageMessage mainTextPrimary={mainTextPrimary} mainTextSecondary={mainTextSecondary} subText={subText} />
                        <StyledSeparator icon="game-icons:police-officer-head" />
                        <div className="form-container">
                            <UpdatePasswordForm />
                        </div>
                    </div>
                </div>
            </div>
        </HelmetProvider>
    )
}