// import { MouseEventHandler } from "react";
import './CardButton.scss';

interface CardButton {
    name: string;
};

export default function CardButton({name}: CardButton) {

    return (
        <div className="card-button">{name}</div>
    )
}