"use client"
import React, { useRef, useEffect } from 'react';

const Box = ({ b }: { b: number }) => {
  const inputRefs = useRef<HTMLInputElement[]>([]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && index > 0 && !inputRefs.current[index].value) {
      // If Backspace is pressed and the current field is empty, move to the previous field and delete its content
      e.preventDefault();
      inputRefs.current[index - 1].focus();
      inputRefs.current[index - 1].value = '';
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    console.log(e.target.value)
    const newValue = e.target.value.slice(0, 1);

    // Update the value of the input field with the entered character
    inputRefs.current[index].value = newValue;

    if (newValue && index < inputRefs.current.length - 1) {
      // Automatically move to the next input field if a value is entered
      inputRefs.current[index + 1].focus();
    }
  };

  useEffect(() => {
    // Focus on the first input field when the component mounts
    if (inputRefs.current.length > 0) {
      inputRefs.current[0].focus();
    }
  }, []);

  return (
    <div className='flex'>
      {(Array(b) as unknown[]).fill(null).map((_, index) => (
        <input
          key={index}
          // @ts-ignore
          ref={(el) => (inputRefs.current[index] = el)}
          className='text-center border border-gray-800 d-block w-3 h-3 p-[1px]  '
          type="text"
          onKeyDown={(e) => handleKeyDown(e, index)} // Handle Backspace and focus change
          onChange={(e) => handleInputChange(e, index)} // Automatically move to the next input on input
          maxLength={1} // Set the maximum length to 1 character
        />
      ))}
    </div>
  );
}

export default Box;
