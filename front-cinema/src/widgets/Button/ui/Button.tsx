import React from "react";

export const Button = ({ children, className, onClick, disabled }) => {
  return (
    <button className={className} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};
