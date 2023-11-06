import React from "react";
import cls from "./Pagination.module.css";

export const Pagination = ({ page, setPage }) => {
  return (
    <div className={cls.pagination}>
      <button
        className={cls.button}
        disabled={page === 1}
        onClick={() => setPage((page) => page - 1)}
      >
        ⯇
      </button>
      <button
        className={cls.button}
        disabled={page === 2}
        onClick={() => setPage((page) => page + 1)}
      >
        ⯈
      </button>
    </div>
  );
};
