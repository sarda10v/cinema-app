import React from "react";
import cls from "./Loader.module.css";
const Loader = () => {
  return (
    <div className={cls.spinner}>
      <div className={cls.loader}>
        <div className={cls.container}>
          <div className={cls.carousel}>
            <div className={cls.love}></div>
            <div className={cls.love}></div>
            <div className={cls.love}></div>
            <div className={cls.love}></div>
            <div className={cls.love}></div>
            <div className={cls.love}></div>
            <div className={cls.love}></div>
          </div>
        </div>
        <div className={cls.container}>
          <div className={cls.carousel}>
            <div className={cls.death}></div>
            <div className={cls.death}></div>
            <div className={cls.death}></div>
            <div className={cls.death}></div>
            <div className={cls.death}></div>
            <div className={cls.death}></div>
            <div className={cls.death}></div>
          </div>
        </div>
        <div className={cls.container}>
          <div className={cls.carousel}>
            <div className={cls.robots}></div>
            <div className={cls.robots}></div>
            <div className={cls.robots}></div>
            <div className={cls.robots}></div>
            <div className={cls.robots}></div>
            <div className={cls.robots}></div>
            <div className={cls.robots}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
