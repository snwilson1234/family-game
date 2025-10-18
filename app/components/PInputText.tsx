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

  const forceProper = (word: string) => {
    let newWord = word.toLowerCase();
    if (newWord.length >= 1) {
      newWord = newWord[0].toUpperCase() + newWord.substring(1,newWord.length);
    }
    return newWord;
  }

  return (
    <InputText
      name={name}
      value={value}
      maxLength={maxLength}
      onChange={(e) => onChange(forceProper(e.target.value))}
      placeholder={placeholder}
    />
    )
}

export default PInputText;