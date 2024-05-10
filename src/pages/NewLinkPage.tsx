import NewLinkForm from "../components/release-forms/NewLinkForm";
import DirectionSeparator from "../components/common/DirectionSeparator";
import '../assets/sass/common/messageAndFormContainer.scss';

export default function NewLinkPage() {

    return(
        <div className="page">
            <div className="content">
                <div className="message-and-form-container">
                    <div className="message-container">
                        <h1><span>Start</span> by entering your release Spotify Id</h1>
                        <p>It will automatically generate a new vibrlink with the Spotify, Deezer and YouTube links. Then, you'll be able to add other platforms links and manage them as you want. Let's go !</p>
                    </div>
                    <DirectionSeparator />
                    <div className="form-container">
                        <NewLinkForm />
                    </div>
                </div>
            </div>
        </div>
    )
}