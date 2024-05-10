import { Icon } from '@iconify-icon/react';
import './StyledSeparator.scss';

interface DirectionSeparatorProps {
    icon: string;
}

export default function DirectionSeparator({ icon }: DirectionSeparatorProps) {
    return (
        <div className="styled-separator ">
            <div className="slider-line"></div>
            <div className="styled-separator-icon">
                <Icon icon={icon} className="icon" />
            </div>
        </div>
    )
}