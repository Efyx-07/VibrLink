import DbVibrlinkCard from "../components/cards/DbVibrlinkCard"
import '../assets/sass/common/pages-common-styles.scss';

export default function VibrlinksPage() {

    return (
        <div className="page">
            <div className="content">
                <h1>VibrlinksPage</h1>
                <div className="dbVibrlinkCards-container">
                    <DbVibrlinkCard />
                </div>
            </div>
        </div>
    )
};