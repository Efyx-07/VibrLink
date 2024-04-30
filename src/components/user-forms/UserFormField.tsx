interface Field {
    label: string;
    type: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    mention?: string;
    className?: string;
};

export default function UserFormField({ label, type, name, value, onChange, mention, className }: Field) {
    return (
      <div className="input-container">
        <label htmlFor={name}>{label}</label>
        <p className="mention">{mention}</p>
        <input type={type} name={name} value={value} onChange={onChange} className={className} required />
      </div>
    );
};