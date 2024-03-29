import React, { useState } from "react";
import CinemaModal from "../CinemaModal/CinemaModal";
import cls from "./CinemaCard.module.css";

const CinemaCard = ({ item }) => {
  const [lgShow, setLgShow] = useState(false);

  return (
    <div className={cls.cardCinema} key={item._id}>
      <img
        onClick={() => setLgShow(true)}
        src={`http://localhost:4000/image/cinema/${item.image}`}
        alt="cinema"
      />
      <CinemaModal lgShow={lgShow} setLgShow={setLgShow} item={item} />
    </div>
  );
};

export default CinemaCard;
