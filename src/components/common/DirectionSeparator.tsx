import { Icon } from '@iconify-icon/react';
import './DirectionSeparator.scss';

export default function DirectionSeparator() {
    return (
        <div className="direction-separator ">
            <div className="slider-line"></div>
            <div className="direction-icon">
                <Icon icon="clarity:arrow-line" className="icon" />
            </div>
        </div>
    )
}