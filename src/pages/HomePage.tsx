import { Helmet, HelmetProvider } from 'react-helmet-async';
import Hero from '../components/home-page/Hero';
import '../assets/sass/common/pages-common-styles.scss';

export default function HomePage() {

    return (
        <HelmetProvider>
            <Helmet>
                {/* specific SEO part */}
                <title>VibrLink | Home</title>
            </Helmet>
            <div className='page'>
                <div className="content">
                    <Hero />
                </div>
            </div>
        </HelmetProvider>
    );
};

