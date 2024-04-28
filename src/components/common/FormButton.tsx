interface Button {
    type: "submit" | "reset" | "button" | undefined;
    name: string;
};

export default function FormButton({ type, name }: Button) {

    return (
        <button type={type}>{name}</button>
    )
}