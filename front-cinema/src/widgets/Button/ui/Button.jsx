import React from "react";
import cls from './Button.module.css'

export const Button = ({ children, className, onClick, disabled }) => {
  return (
    <button className={className && cls.button} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};
