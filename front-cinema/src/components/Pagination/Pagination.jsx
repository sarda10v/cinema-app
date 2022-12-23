import React from "react";
import styles from "./Pagination.module.css";
const Pagination = ({ page, setPage }) => {
  return (
    <div className={styles.pagination}>
      <button
        className={styles.paginationBtn}
        disabled={page === 1}
        onClick={() => setPage((page) => page - 1)}
      >
        ⯇
      </button>
      <button
        className={styles.paginationBtn}
        disabled={page === 2}
        onClick={() => setPage((page) => page + 1)}
      >
        ⯈
      </button>
    </div>
  );
};

export default Pagination;
