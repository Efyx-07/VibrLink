import './FormButton.scss';

interface Button {
    type: "submit" | "reset" | "button" | undefined;
    name: string;
};

export default function FormButton({ type, name }: Button) {

    return (
        <button type={type} className="form-button">
            <p>{name}</p>
        </button>
    )
};