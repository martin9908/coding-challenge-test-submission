import { useState } from "react";

type FormFields = Record<string, string>;

export default function useFormFields(initialValues: FormFields) {
  const [fields, setFields] = useState<FormFields>(initialValues);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFields((prev) => ({ ...prev, [name]: value }));
  };

  const resetFields = () => setFields(initialValues);

  return { fields, onChange, resetFields, setFields };
}
