import { useEffect } from 'react';
import { useUserStore } from '../../stores';
import { useNavigate } from 'react-router-dom';
import FormButton from '../common/FormButton';
import './Hero.scss';

export default function Hero() {

    // get the login status of the user to display the wanted buttons
    const isLogged: boolean = useUserStore(state => state.isLoggedIn);

    const navigate = useNavigate();

    // watch and update the login status of the user
    useEffect(() => {
    }, [isLogged]);

    return (
        <div className="hero-container">
            <div className="text-container">
                <h1>Hey, it's the <span>big day </span>!<br/>Ready to launch your new music ?</h1>
                <p>As a musician, we know how special this day is and how exciting it is to share your new release with your fan community. Let's do it!</p>
            </div>
            <div className="buttons-container">
                {isLogged ? 
                    (
                        <FormButton type="button" name="Create a new vibrLink" onClick={() => navigate('/new-vibrlink')} id="hero-button"/>
                    )
                    :
                    (
                        <>
                            <FormButton id="hero-button" type="button" name="Create a free account" onClick={() => navigate('/signup')}/>
                            <p>or</p>
                            <FormButton id="hero-button" type="button" name="Sign in" onClick={() => navigate('/login')}/>
                        </>
                    )
                }
            </div>
        </div>
    )
}