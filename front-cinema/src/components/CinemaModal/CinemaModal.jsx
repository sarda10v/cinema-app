import React from "react";
import Modal from "react-bootstrap/Modal";
import { Link } from "react-router-dom";
import styles from "./CinemaModal.module.css";

const CinemaModal = ({ lgShow, setLgShow, item }) => {
  return (
    <Modal size="lg" show={lgShow} onHide={() => setLgShow(false)}>
      <ul className={styles.ulWrapper}>
        <h2>{item.name}</h2>
        <li>
          <iframe
            width="560"
            height="300"
            src={`${item.trailer}`}
            title="YouTube video player"
            frameBorder="1"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </li>
        <div className={styles.contentWrapper}>
          <li>
            <b>Актеры:</b>
            {item.actors.map((i, index, arr) =>
              index === arr.length - 1 ? ` ${i.fullname}.` : ` ${i.fullname},`
            )}
          </li>
          <li>
            <b>Жанры:</b>
            {item.genres.map((i, index, arr) =>
              index === arr.length - 1 ? ` ${i.genres}.` : ` ${i.genres},`
            )}
          </li>
          <li>
            <b>Теги:</b>
            {item.tags.map((i, index, arr) =>
              index === arr.length - 1 ? ` ${i.tags}.` : ` ${i.tags},`
            )}
          </li>
          <li>
            <b>Год:</b> {item.year}.
          </li>
          <li>
            <b>Описание:</b>
            <span> {item.description.substr(0, 190) + "..."}</span>
          </li>
        </div>
        <Link
          className={styles.modalBtn}
          item={item}
          to={`/cinema/${item._id}`}
        >
          <button>Подробнее...</button>
        </Link>
      </ul>
    </Modal>
  );
};

export default CinemaModal;
