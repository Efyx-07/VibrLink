import NewLinkForm from "../components/release-forms/NewLinkForm";
import FormPageMessage from "../components/common/FormPageMessage";
import StyledSeparator from "../components/common/StyledSeparator";
import '../assets/sass/common/messageAndFormContainer.scss';

export default function NewLinkPage() {

    const mainTextPrimary: string = 'Start';
    const mainTextSecondary: string = ' by entering your release Spotify id';
    const subText: string = 'It will automatically generate a new vibrlink with the Spotify, Deezer and YouTube links. Then, you\'ll be able to add other platforms links and manage them as you want. Let\'s go !';

    return(
        <div className="page">
            <div className="content">
                <div className="message-and-form-container">
                    <FormPageMessage mainTextPrimary={mainTextPrimary} mainTextSecondary={mainTextSecondary} subText={subText} />
                    <StyledSeparator icon="ph:music-notes-simple-fill" />
                    <div className="form-container">
                        <NewLinkForm />
                    </div>
                </div>
            </div>
        </div>
    )
}