interface Field {
    label: string;
    type: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function UserFormField({ label, type, name, value, onChange }: Field) {
    return (
      <div className="input-container">
        <label htmlFor={name}>{label}</label>
        <input type={type} name={name} value={value} onChange={onChange} />
      </div>
    );
};