"use client"
//Working --Box-before-Full-selecting
import React, { useRef, useState, useEffect } from 'react';

const Box = ({ b }: { b: number }) => {
  const inputRefs = useRef<HTMLInputElement[]>([]);
  const [selectionStart, setSelectionStart] = useState<number | null>(null);
  const [selectionEnd, setSelectionEnd] = useState<number | null>(null);
  const isSelecting = useRef(false);


  const handleMouseDown = (index: number) => {
    setSelectionStart(index);
    setSelectionEnd(index);
    isSelecting.current = true;
  };

  const handleMouseEnter = (index: number) => {
    if (isSelecting.current) {
      setSelectionEnd(index);
    }
  };

  useEffect(() => {
    const handleGlobalMouseUp = () => {
      isSelecting.current = false;
    };

    window.addEventListener('mouseup', handleGlobalMouseUp);

    return () => {
      window.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (!inputRefs.current.some(ref => ref && ref.contains(event.target))) {
        setSelectionStart(null);
        setSelectionEnd(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);


  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {

    if (e.key === 'Backspace') {
      e.preventDefault();

      if (selectionStart !== null && selectionEnd !== null && selectionStart !== selectionEnd) {
        // Range deletion
        const start = Math.min(selectionStart, selectionEnd);
        const end = Math.max(selectionStart, selectionEnd);

        // Clear the range
        for (let i = start; i <= end; i++) {
          inputRefs.current[i].value = '';
        }

        // Shift the characters after the range to the left
        const valuesAfterEnd = inputRefs.current.slice(end + 1).map(ref => ref.value);
        for (let i = 0; i < valuesAfterEnd.length; i++) {
          inputRefs.current[start + i].value = valuesAfterEnd[i];
          if (i < valuesAfterEnd.length) {
            inputRefs.current[start + i + 1].value = '';
          }
        }

        // Set focus to the start of the deleted range
        inputRefs.current[start].focus();

        // Reset selection state
        setSelectionStart(null);
        setSelectionEnd(null);
      } else {
        // Single character deletion
        if (index > 0 || inputRefs.current[index].value) {
          // Shift characters to the left from the current index
          for (let i = index; i < inputRefs.current.length - 1; i++) {
            inputRefs.current[i].value = inputRefs.current[i + 1].value;
          }

          // Clear the last input
          if (inputRefs.current[inputRefs.current.length - 1]) {
            inputRefs.current[inputRefs.current.length - 1].value = '';
          }

          // Focus the correct input
          inputRefs.current[Math.max(0, index - 1)].focus();
        }
      }
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
    const pastedData = e.clipboardData.getData('text');
    const startIdx = index;
    const endIdx = Math.min(startIdx + pastedData.length - 1, b - 1);
    const selectionLength = endIdx - startIdx + 1;
  
    // Calculate how many characters will be replaced and how many will be shifted to the right
    const replaceCount = Math.min(selectionLength, pastedData.length);
    const shiftCount = selectionLength - replaceCount;
  
    // Replace the selected text with the pasted characters
    for (let i = 0; i < replaceCount; i++) {
      inputRefs.current[startIdx + i].value = pastedData[i];
    }
  
    // Shift the remaining characters to the right after the pasted text, if necessary
    if (shiftCount > 0) {
      for (let i = b - shiftCount - 1; i >= endIdx + 1; i--) {
        inputRefs.current[i + shiftCount].value = inputRefs.current[i].value;
      }
    }
  
    // If pasted data is longer than the selection, fill in the additional characters
    for (let i = replaceCount; i < pastedData.length; i++) {
      if (startIdx + i < b) {
        inputRefs.current[startIdx + i].value = pastedData[i];
      }
    }
  
    // Set focus to the next empty input if there is one
    const nextIndex = startIdx + replaceCount;
    if (nextIndex < inputRefs.current.length) {
      inputRefs.current[nextIndex].focus();
    }
  };


  useEffect(() => {
    if (inputRefs.current.length > 0) {
      inputRefs.current[0].focus();
    }
  }, [b]);

  // for selection color
  const isIndexSelected = (index: number) => {
    // Convert to non-null values for comparison
    let start = selectionStart ?? -1;
    let end = selectionEnd ?? -1;

    // If selectionStart or selectionEnd is null, no selection is made
    if (start === -1 || end === -1) return false;

    if (start > end) [start, end] = [end, start]; // Swap if start is greater than end
    return index >= start && index <= end;
  };

  return (
    <div className='flex'>
      {Array.from({ length: b }, (_, index) => (
        <input
          key={index}
          // @ts-ignore
          ref={(el) => inputRefs.current[index] = el}
          onMouseDown={() => handleMouseDown(index)}
          onMouseEnter={() => handleMouseEnter(index)}
          className={`text-center border font-medium border-gray-800 d-block w-[16px] h-[16px]  ${isIndexSelected(index) ? 'bg-blue-300' : ''}`}
          style={{ fontSize: "15px" }}
          type="text"
          tabIndex={index === 0 ? 0 : -1}
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
