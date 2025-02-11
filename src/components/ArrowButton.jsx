import React from 'react';

const ArrowButton = ({ direction, onClick, disabled }) => {
  const arrowDirection = direction === 'left' ? '←' : '→';

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        px-4 py-2 
        bg-blue-500 
        text-white 
        rounded-md 
        flex items-center justify-center
        transition-colors
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'}
      `}
    >
      {arrowDirection}
    </button>
  );
};

export default ArrowButton;
