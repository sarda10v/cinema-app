import React from "react";
import cls from "./Icon.module.css";

// Компонент Icon, который обертывает использование ion-icon
export const Icon = ({ name, onClick }) => {
  return (
    <div className={cls.icon}>
      <ion-icon name={name} onClick={onClick}></ion-icon>
    </div>
  );
};
