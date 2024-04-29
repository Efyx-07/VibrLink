import '../assets/sass/common/pages-common-styles.scss';
import SignupForm from '../components/user-forms/SignupForm';

export default function SignupPage() {
    return (
        <div className='page'>
            <div className="content">
                <SignupForm />
            </div>
        </div>
    )
};
