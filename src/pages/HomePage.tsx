import Hero from '../components/home-page/Hero';
import '../assets/sass/common/pages-common-styles.scss';

export default function HomePage() {

    return (
        <div className='page'>
            <div className="content">
                <Hero />
            </div>
        </div>
    );
};

