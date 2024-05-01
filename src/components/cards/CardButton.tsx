import { MouseEventHandler } from "react";
import { Icon } from '@iconify-icon/react';
import './CardButton.scss';

interface CardButton {
    name: string;
    icon: string;
    onClick: MouseEventHandler<HTMLDivElement>;
};

export default function CardButton({name, icon, onClick}: CardButton) {

    return (
        <div className="card-button" onClick={onClick} >
            <Icon icon={icon} />
            <p>{name}</p>
        </div>
    )
}