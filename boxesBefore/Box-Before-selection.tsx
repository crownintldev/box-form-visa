"use client"
import React, { useRef, useState, useEffect } from 'react';

const Box = ({ b }: { b: number }) => {
  const inputRefs = useRef<HTMLInputElement[]>([]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
 
    if (e.key === 'Backspace' && index > 0 && !inputRefs.current[index].value) {
      e.preventDefault();
      inputRefs.current[index - 1].focus();
      inputRefs.current[index - 1].value = '';
    }
    // Handle right arrow
    if (e.key === 'ArrowRight' && index < b - 1) {
      e.preventDefault();
      inputRefs.current[index + 1].focus();
    }

    // Handle left arrow
    if (e.key === 'ArrowLeft' && index > 0) {
      e.preventDefault();
      inputRefs.current[index - 1].focus();
    }
  };
  // @ts-ignore
  const distributeCharacters = (characters, startIndex) => {
    let nextIndex = startIndex;
    for (let char of characters) {
      if (nextIndex < inputRefs.current.length) {
        inputRefs.current[nextIndex].value = char;
        nextIndex++;
      }
    }
    // Set focus to the next empty input if there is one
    if (nextIndex < inputRefs.current.length) {
      inputRefs.current[nextIndex].focus();
    }
  };

  const handleInput = (e: React.FormEvent<HTMLInputElement>, index: number) => {
    const inputChar = e.currentTarget.value;
    if (inputChar.length === 1) {
      // Handle single character input (typing)
      if (index < inputRefs.current.length - 1) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>, index: number) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, b - index);
    distributeCharacters(pastedData, index);
  };

  useEffect(() => {
    if (inputRefs.current.length > 0) {
      inputRefs.current[0].focus();
    }
  }, [b]);

  return (
    <div className='flex'>
      {Array.from({ length: b }, (_, index) => (
        <input
          key={index}
          // @ts-ignore
          ref={(el) => inputRefs.current[index] = el}
          className='text-center border font-medium border-gray-800 d-block w-[16px] h-[16px]'
          style={{ fontSize: "15px" }}
          type="text"
          onKeyDown={(e) => handleKeyDown(e, index)}
          onInput={(e) => handleInput(e, index)}
          onPaste={(e) => handlePaste(e, index)}
          maxLength={1}
        />
      ))}
    </div>
  );
}

export default Box;
