interface Field {
    label: Label;
    input: Input;
};

interface Label {
    for: string;
    name: string;
};

interface Input {
    type: string;
    name: string;
    value: string;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
    class: string | null;
};

function Field({label, input}: {label: Label, input: Input}) {
    return (
        <div className="field">
            <label htmlFor={label.for}>{label.name}</label>
            <input 
                type={input.type}
                name={input.name}
                value={input.value}
                onChange={input.onChange}
                className={input.class || ''}
            />
        </div>
    )
};

export default function LoginForm() {
    return (
        <form>
        </form>
    )
};

