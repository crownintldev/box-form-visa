"use client"
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
    const handleClickOutside = (event:any) => {
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


  // const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
  //   if (e.key === 'Backspace') {
  //     e.preventDefault();
  
  //     if (selectionStart !== null && selectionEnd !== null) {
  //       const start = Math.min(selectionStart, selectionEnd);
  //       const end = Math.max(selectionStart, selectionEnd);
  
  //       // Remove the selected range and capture the values after the selection.
  //       const valuesAfterSelection = inputRefs.current
  //         .slice(end + 1)
  //         .map(ref => ref.value);
  
  //       // Clear all inputs from the start of the selection onwards.
  //       for (let i = start; i < inputRefs.current.length; i++) {
  //         inputRefs.current[i].value = '';
  //       }
  
  //       // Merge the values after the selection into the cleared inputs.
  //       for (let i = 0; i < valuesAfterSelection.length; i++) {
  //         inputRefs.current[start + i].value = valuesAfterSelection[i];
  //       }
  
  //       setSelectionStart(null);
  //       setSelectionEnd(null);
  
  //       // Focus the input at the start of the previous selection.
  //       inputRefs.current[start].focus();
  //     } else if (index > 0 && !inputRefs.current[index].value) {
  //       // Handle case for single backspace with no selection
  //       inputRefs.current[index - 1].value = '';
  //       inputRefs.current[index - 1].focus();
  //     }
  //   }
  
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
