import React from 'react';

interface FieldProps {
  value: string;
  onChange: (s: string) => void;
}

const Field = ({ value, onChange }: FieldProps) => {
  const update = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.currentTarget.value);
  }

  return (
    <input value={value} onChange={update} />
  );
}

export default Field;
