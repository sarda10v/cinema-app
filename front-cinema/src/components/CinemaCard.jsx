import React, { useState } from "react";
import CinemaModal from "./CinemaModal";
import styles from "../css/CinemaCard.module.css";
const CinemaCard = ({ item }) => {
  const [lgShow, setLgShow] = useState(false);

  return (
    <React.Fragment>
      <div className={styles.cardCinema} key={item._id}>
        <img
          onClick={() => setLgShow(true)}
          src={`http://localhost:4000/image/cinema/${item.image}`}
          alt="cinema"
        />
        <CinemaModal lgShow={lgShow} setLgShow={setLgShow} item={item} />
      </div>
    </React.Fragment>
  );
};

export default CinemaCard;
