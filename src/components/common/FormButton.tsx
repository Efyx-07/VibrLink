import { MouseEventHandler } from "react";
import './FormButton.scss';

interface ButtonProps {
    type: "submit" | "reset" | "button" | undefined;
    name: string;
    onClick?: MouseEventHandler<HTMLButtonElement>;
};

export default function FormButton({ type, name, onClick }: ButtonProps) {

    return (
        <button type={type} onClick={onClick} className="form-button">
            <p>{name}</p>
        </button>
    )
};