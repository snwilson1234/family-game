'use client';

import { Dropdown } from 'primereact/dropdown';
import { useState } from 'react';


type DropdownOption = {
  value: string;
  label: string;
};

export interface PDropdownProps {
  options: DropdownOption[];
  placeholder: string;
  onChange: (val: number) => void;
//   value: boolean;
};

const PDropdown = ({
  options,
  placeholder,
  onChange
}: PDropdownProps) => {

  const [selectedOption, setSelectedOption] = useState();
 
  return (
      <Dropdown
        options={options}
        placeholder={placeholder}
        value={selectedOption}
        onChange={(e) => {
          setSelectedOption(e.value);
          onChange(e.value);
        }}
      />
    )
}

export default PDropdown;