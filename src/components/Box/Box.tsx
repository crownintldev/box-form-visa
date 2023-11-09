// @ts-nocheck
"use client"
//Working --Box-before-Full-selecting
import React, { useRef, useState, useEffect } from 'react';

const Box = ({ b }: { b: number }) => {
  const [undoStack, setUndoStack] = useState([]);
  const [redoStack, setRedoStack] = useState([]);
  const inputRefs = useRef<HTMLInputElement[]>([]);
  const [selectionStart, setSelectionStart] = useState<number | null>(null);
  const [selectionEnd, setSelectionEnd] = useState<number | null>(null);
  const isSelecting = useRef(false);

  const saveForUndo = (currentState) => {
    setUndoStack(prev => [...prev, currentState]);
    setRedoStack([]); // Clear the redo stack whenever a new change is made
  };

  const undo = () => {
    if (undoStack.length > 0) {
      const newState = undoStack.pop();
      setRedoStack(prev => [...prev, inputRefs.current.map(ref => ref.value)]);
      applyState(newState);
      setUndoStack(undoStack);
    }
  };
  

  const redo = () => {
    if (redoStack.length > 0) {
      const newState = redoStack.pop();
      setUndoStack(prev => [...prev, inputRefs.current.map(ref => ref.value)]);
      applyState(newState);
      setRedoStack(redoStack);
    }
  };

  const applyState = (state) => {
    inputRefs.current.forEach((ref, index) => {
      ref.value = state[index];
    });
  };
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
      if (e.ctrlKey && e.key === 'z') {
        e.preventDefault();
        undo();
      }
      if (e.ctrlKey && e.key === 'y') {
        e.preventDefault();
        redo();
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
    saveForUndo();
    const inputChar = e.currentTarget.value;

    if (selectionStart !== null && selectionEnd !== null) {
      // Clear the selection range
      const start = Math.min(selectionStart, selectionEnd);
      const end = Math.max(selectionStart, selectionEnd);
      for (let i = start; i <= end; i++) {
        inputRefs.current[i].value = '';
      }

      // Shift the characters after the selection end to the right by one position to make space
      for (let i = b - 1; i > end; i--) {
        inputRefs.current[i].value = inputRefs.current[i - 1].value;
      }

      // Insert the typed character at the start of the selection
      inputRefs.current[start].value = inputChar;

      // Reset the selection range
      setSelectionStart(null);
      setSelectionEnd(null);

      // Set the focus to the next input after the typed character
      if (start + 1 < b) {
        inputRefs.current[start + 1].focus();
      }
    } else if (inputChar.length === 1 && index < b - 1) {
      // If there's no selection and a single character was input, simply move to the next input
      inputRefs.current[index + 1].focus();
    }
  };


  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>, index: number) => {
    e.preventDefault();
    
    // Save the current state for undo functionality
    const prePasteState = inputRefs.current.map(ref => ref.value);
    saveForUndo(prePasteState);
    const currentState = inputRefs.current.map(ref => ref.value);
    saveForUndo(currentState);
  
    // Get the pasted text
    const pastedText = e.clipboardData.getData('text');
    const pastedData = pastedText.split('');
  
    // Calculate the range for selection or cursor position
    const startIdx = selectionStart !== null ? Math.min(selectionStart, selectionEnd) : index;
    const endIdx = selectionEnd !== null ? selectionEnd : startIdx;
    const endPasteIdx = startIdx + pastedData.length;
  
    // Prepare an array to hold the new sequence of characters
    let newValues = [...currentState]; // Start with a copy of the current state
    newValues.forEach((val, i) => {
      inputRefs.current[i].value = val;
    });
    const postPasteState = inputRefs.current.map(ref => ref.value);
    saveForUndo(postPasteState);

    // Apply the pasted characters and shift the existing characters as necessary
    for (let i = startIdx; i < endPasteIdx; i++) {
      if (i < b) {
        newValues[i] = pastedData[i - startIdx];
      }
    }
    for (let i = endPasteIdx; i < b; i++) {
      newValues[i] = currentState[i - pastedData.length + (endIdx - startIdx + 1)];
    }
  
    // Set the new values to the inputs
    newValues.forEach((val, i) => {
      inputRefs.current[i].value = val;
    });
  
    // Focus the next input after the pasted text
    if (inputRefs.current[endPasteIdx]) {
      inputRefs.current[endPasteIdx].focus();
    }
  
    // Save the new state after pasting
    setUndoStack(prev => [...prev, newValues]);
    // Clear the redo stack since we have a new state
    setRedoStack([]);
  
    // Reset selection state
    setSelectionStart(null);
    setSelectionEnd(null);
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
