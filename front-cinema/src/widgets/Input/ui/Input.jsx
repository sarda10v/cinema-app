import React from "react";
import cls from "./Input.module.css";
import { Icon } from "../../Icon";

export const Input = ({ value, setValue }) => {
  return (
    <div className={cls.wrapper}>
      <Icon name="search-outline" />
      <input
        className={cls.input}
        type="text"
        placeholder="Поиск фильма, по названию, по жанрам, по актерам, по тегам, по годам..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      {value ? (
        <Icon name="close-outline" onClick={() => setValue("")} />
      ) : null}
    </div>
  );
};
