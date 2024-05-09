import { MouseEventHandler } from "react";
import { Icon } from '@iconify-icon/react';
import './DBCardButton.scss';

interface CardButtonProps {
    name: string;
    icon: string;
    onClick: MouseEventHandler<HTMLDivElement>;
};

export default function CardButton({name, icon, onClick}: CardButtonProps) {

    return (
        <div className="card-button" onClick={onClick}>
            <Icon icon={icon} />
            <p>{name}</p>
        </div>
    )
}