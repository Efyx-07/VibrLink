import FormButton from '../common/FormButton';
import './Hero.scss';

export default function Hero() {
    return (
        <div className="hero-container">
            <div className="text-container">
                <h1>Hey it's the <span>big day </span>!<br/>Ready to launch your new music ?</h1>
                <p>As a musician, we know how special this day is and how exciting it is to share your new release with your fan community. Let's do it!</p>
            </div>
            <div className="buttons-container">
                <FormButton type="button" name="Create a free account"/>
                <p>or</p>
                <FormButton type="button" name="Sign in"/>
            </div>
        </div>
    )
}