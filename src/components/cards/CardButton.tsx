// import { MouseEventHandler } from "react";
import './CardButton.scss';
import { Icon } from '@iconify-icon/react';

interface CardButton {
    name: string;
    icon: string;
};

export default function CardButton({name, icon}: CardButton) {

    return (
        <div className="card-button">
            <Icon icon={icon} />
            <p>{name}</p>
        </div>
    )
}