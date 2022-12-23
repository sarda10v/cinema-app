import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { fetchCinema } from "../../features/cinemaSlice";
import styles from "./CinemaSpecific.module.css";
import Review from "../Review/Review";

const CinemaSpecific = () => {
  const cinema = useSelector((state) => state.cinema.cinema);
  const dispatch = useDispatch();
  const { id } = useParams(); // id фильма

  // !! ФИЛЬТРАЦИЯ ФИЛЬМА ПО ОПРЕДЕЛЕННОМУ ЖАНРУ
  const filteredCinemaById = cinema.filter((i) => i._id === id);

  useEffect(() => {
    dispatch(fetchCinema());
  }, [dispatch]);

  return (
    <div className={styles.mainCinema}>
      {/* HEADER */}
      <header>
        <Link to={"/"} className={styles.logoWrapper}>
          <div className={styles.logo}>CINEMA</div>
        </Link>
      </header>

      {filteredCinemaById.map((item) => {
        return (
          <React.Fragment key={item._id}>
            {/* IFRAME */}
            <div className={styles.IframeCinema}>
              <div className={styles.borderIframeCinema}></div>
              <iframe
                src={`${item.trailer}?&autoplay=1`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            {/* INFORMATION */}
            <div className={styles.cinemaInform}>
              <div className={styles.flexCinemaInform}>
                <div className={styles.imageCinemaInform}>
                  <img
                    src={`http://localhost:4000/image/cinema/${item.image}`}
                    alt="cinema"
                  />
                </div>
                <div className={styles.descriptionСinemaInform}>
                  {/* NAME'S */}
                  <h2>
                    {item.name}({item.year})
                  </h2>
                  {/* DESCRIPTION'S */}
                  <h5>О фильме:</h5>
                  <li>{item.description}</li>
                  {/* GENRE'S */}
                  <li>
                    <b>Жанры:</b>
                    {item.genres.map((i, index, arr) =>
                      index === arr.length - 1
                        ? ` ${i.genres}.`
                        : ` ${i.genres},`
                    )}
                  </li>
                  {/* TAG'S */}
                  <li>
                    <b>Теги:</b>
                    {item.tags.map((i, index, arr) =>
                      index === arr.length - 1 ? ` ${i.tags}.` : ` ${i.tags},`
                    )}
                  </li>
                  {/* YEAR'S */}
                  <li>
                    <b>Год:</b> {item.year}.
                  </li>
                  {/* ACTOR'S */}
                  <h5>Актеры:</h5>
                  <div className={styles.actorsWrapper}>
                    {item.actors.map((i) => {
                      return (
                        <div className={styles.cardActors} key={i._id}>
                          <div className={styles.imgActors} key={i._id}>
                            <img
                              src={`http://localhost:4000/image/actors/${i.image}`}
                              alt="cinema"
                            />
                          </div>
                          <div className={styles.nameActors}>{i.fullname}</div>
                        </div>
                      );
                    })}
                  </div>
                  {/* COMMENT'S */}
                  <Review />
                </div>
              </div>
            </div>
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default CinemaSpecific;
