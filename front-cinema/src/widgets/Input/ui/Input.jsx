import React from "react";
import cls from "./Input.module.css";

export const Input = ({value, setValue}) => {
  return (
    <div className={cls.input}>
      <ion-icon name="search-outline"></ion-icon>
      <input
        type="text"
        placeholder="Поиск фильма, по названию, по жанрам, по актерам, по тегам, по годам..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      {value ? (
        <ion-icon onClick={() => setValue("")} name="close-outline"></ion-icon>
      ) : null}
    </div>
  );
};
