import React from "react";
import styles from "../css/Pagination.module.css";
import ReactPaginate from "react-paginate";

const Pagination = ({onChangePage}) => {
  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel=">"
      previousLabel="<"
      onPageChange={(event) => onChangePage(event.selected + 1)}
      pageRangeDisplayed={4}
      pageCount={4}
      renderOnZeroPageCount={null}
    />
  );
};

export default Pagination;
