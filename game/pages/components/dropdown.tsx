import React, { useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

function MyDropdown({ options, onSelect }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);
  const [selectedValueLabel, setSelectedValueLabel] = useState(null);

  const handleOptionClick = (value, label) => {
    setSelectedValue(value);
    setSelectedValueLabel(label);
    onSelect(value);
    setIsOpen(false);
  };

  return (
  <div className="flex flex-row justify-center h-1/2 w-1/2">
    <ul className={`flex flex-col w-2/3 items-center bg-indigo-700 rounded-t-lg rounded-b-lg ${isOpen ? 'outline-2 outline-indigo-400 h-70' : 'h-10'}`}>
      <li 
        onClick={() => setIsOpen(!isOpen)}
        className={`flex flex-row w-full h-10 p-3 items-center justify-between bg-indigo-700 rounded-t-lg ${isOpen ? 'outline-2 outline-indigo-400' : 'rounded-b-lg hover:outline-2 hover:outline-indigo-400'} hover:cursor-pointer`}
      >
        <p>{selectedValueLabel || 'Choose a number'}</p>
        {isOpen && (
          <p><ExpandLessIcon /></p>
        )}
        {!isOpen && (
          <p><ExpandMoreIcon /></p>
        )}
      </li>
      {isOpen && options.map((option) => (
        <li
          key={option.value}
          className="flex flex-col p-2 pl-6 bg-indigo-600 w-full hover:cursor-pointer hover:bg-indigo-400 last:rounded-b-lg"
          onClick={() => handleOptionClick(option.value, option.label)}
        >
          {option.label}
        </li>
      ))}
    </ul>
  </div>
  );
}

export default MyDropdown;