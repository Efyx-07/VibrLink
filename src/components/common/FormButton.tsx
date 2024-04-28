import './FormButton.scss';

interface Button {
    type: "submit" | "reset" | "button" | undefined;
    name: string;
    className?: string;
};

export default function FormButton({ type, name, className }: Button) {

    return (
        <button type={type} className={className}>
            <p>{name}</p>
        </button>
    )
};