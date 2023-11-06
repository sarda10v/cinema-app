import React from "react";
import cls from "./Logo.module.css";

export const Logo = ({ title }) => {
  return <h4 className={cls.logo}>{title}</h4>;
};
