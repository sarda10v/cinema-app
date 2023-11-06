import React from "react";
import cls from "./Title.module.css";

export const Title = ({ text }) => {
  return <div className={cls.title}>{text}</div>;
};
