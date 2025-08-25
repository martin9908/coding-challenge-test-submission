import React, { FunctionComponent } from "react";

import $ from "./InputText.module.css";

interface InputTextProps {
  name: string;
  placeholder: string;
  value?: string | number | readonly string[];
  required?: boolean;
  minLength?: number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputText: FunctionComponent<InputTextProps> = ({
  name,
  onChange,
  placeholder,
  required,
  minLength,
  value,
}) => {
  return (
    <input
      aria-label={name}
      className={$.inputText}
      name={name}
      onChange={onChange}
      placeholder={placeholder}
      type="text"
      value={value}
      minLength={minLength}
      required={required}
    />
  );
};

export default InputText;
