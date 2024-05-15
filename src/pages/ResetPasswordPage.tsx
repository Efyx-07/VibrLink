import { Helmet, HelmetProvider } from 'react-helmet-async';
import ResetPasswordForm from '../components/user-forms/ResetPasswordForm';
import '../assets/sass/common/pages-common-styles.scss';

export default function ResetPasswordPage () {

    return (
        <HelmetProvider>
            <Helmet>
                {/* specific SEO part */}
                <title>VibrLink | Reset password</title>
            </Helmet>
            <div className="page">
                <div className="content">
                    <ResetPasswordForm />
                </div>
            </div>
        </HelmetProvider>
    )
}