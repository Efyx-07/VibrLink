//personnal hook to display a component depending on the path name
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function useComponentVisibility() {

    const location = useLocation();
    const [shouldShowComponent, setShouldShowComponent] = useState<boolean>(true);

    useEffect(() => {
        const isVibrlinkLandingPage = location.pathname.includes('/v');
        setShouldShowComponent(!isVibrlinkLandingPage);
    }, [location.pathname]);

    return shouldShowComponent;
};
