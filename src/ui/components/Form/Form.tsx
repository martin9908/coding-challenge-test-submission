import React, { FunctionComponent, ReactNode } from "react";

import Button from "../Button/Button";
import InputText from "../InputText/InputText";
import $ from "./Form.module.css";

interface FormEntry {
  name: string;
  placeholder: string;
  //  Correct type for forwarding props to <InputText /> (an input element)
  extraProps?: React.InputHTMLAttributes<HTMLInputElement>;
}

interface FormProps {
  legend: string;
  loading?: boolean;
  formEntries?: FormEntry[];
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  submitLabel: string;
  children?: ReactNode;
}

const Form: FunctionComponent<FormProps> = ({
  legend,
  loading = false,
  formEntries,
  onSubmit,
  submitLabel,
  children,
}) => {
  return (
    <form role="form" onSubmit={onSubmit}>
      <fieldset>
        <legend>{legend}</legend>
        <div className={$.formRows}>{children}</div>
        {formEntries?.map(({ name, placeholder, extraProps }, index) => (
          <div key={`${name}-${index}`} className={$.formRow}>
            <InputText
              name={name}
              placeholder={placeholder}
              {...extraProps} //  type-safe spread
            />
          </div>
        ))}

        <Button loading={loading} variant="primary" type="submit">
          {submitLabel}
        </Button>
      </fieldset>
    </form>
  );
};

export default Form;
