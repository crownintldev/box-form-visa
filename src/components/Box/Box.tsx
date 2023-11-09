//@ts-nocheck 
import React, { useState, useEffect, useRef } from 'react';

const Box = ({ b }) => {
  const inputRefs = useRef([]);
  const [inputValues, setInputValues] = useState(Array(b).fill(''));
  const [showSingleInput, setShowSingleInput] = useState(false);
  const singleInputRef = useRef(null);

  const handleSingleInputChange = (e) => {
    const newValues = e.target.value.split('').concat(Array(b - e.target.value.length).fill(''));
    setInputValues(newValues);
  };

  // Focus the single input and set its value when showSingleInput becomes true
  useEffect(() => {
    if (showSingleInput && singleInputRef.current) {
      singleInputRef.current.value = inputValues.join('');
      singleInputRef.current.focus();
    }
  }, [showSingleInput, inputValues]);

  const focusSingleInput = (index) => {
    setShowSingleInput(true);
    // The value and focus are now being handled in the useEffect hook above
  };

  const handleSingleInputBlur = () => {
    setShowSingleInput(false);
    // Optionally, distribute the single input value to the individual box inputs here
  };

  // When user clicks away from the single input, distribute the value across the boxes
  useEffect(() => {
    const handleWindowClick = (e) => {
      if (showSingleInput && singleInputRef.current && !singleInputRef.current.contains(e.target)) {
        handleSingleInputBlur();
      }
    };
    window.addEventListener('click', handleWindowClick);
    return () => {
      window.removeEventListener('click', handleWindowClick);
    };
  }, [showSingleInput]);

  return (
    <div className='flex' onClick={() => focusSingleInput(0)}>
      {showSingleInput ? (
        <input
          ref={singleInputRef}
          type="text"
          className="single-input text-[15px]"
          onChange={handleSingleInputChange}
          onBlur={handleSingleInputBlur}
          maxLength={b}
          autoFocus
        />
      ) : (
        inputValues.map((value, index) => (
          <input
            key={index}
            ref={(el) => inputRefs.current[index] = el}
            type="text"
            className={`text-center border font-medium border-gray-800 d-block w-[16px] h-[16px] `}

            value={value}
            onFocus={() => focusSingleInput(index)}
            readOnly
            maxLength={1}
            tabIndex={0}
          />
        ))
      )}
    </div>
  );
};

export default Box;
