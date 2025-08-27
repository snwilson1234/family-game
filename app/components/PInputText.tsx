'use client';

import { InputText } from 'primereact/inputtext';
import { useState } from 'react';


export interface PInputTextProps {
  name: string;
  value: string;
  maxLength: number;
  placeholder?: string;
  onChange: (value: string) => void;
};

const PInputText = ({
  name,
  value,
  maxLength,
  placeholder="Enter value...",
  onChange
}: PInputTextProps) => {
  return (
      <InputText
        name={name}
        value={value}
        maxLength={maxLength}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
    )
}

export default PInputText;