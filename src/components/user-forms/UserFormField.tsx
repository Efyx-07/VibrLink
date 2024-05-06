import { Icon } from '@iconify-icon/react';

interface Field {
    label: string;
    type: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    mention?: string;
    className?: string;
    isValid?: boolean;
};

export default function UserFormField({ label, type, name, value, onChange, mention, className, isValid }: Field) {
    return (
      <div className="input-container">
        <label htmlFor={name}>{label}</label>
        <p className="mention">{mention}</p>
        <div className="input-wrapper">
          <input type={type} name={name} value={value} onChange={onChange} className={className} required />
          {isValid && <Icon icon="el:ok-sign" className="isValid-icon"/>}
        </div>
      </div>
    );
};