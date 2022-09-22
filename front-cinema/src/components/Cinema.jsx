import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCinema } from "../features/cinemaSlice";
import CinemaCard from "./CinemaCard";
import SignUpModal from "./SignUpModal";
import SignInModal from "./SignInModal";
import styles from "../css/Cinema.module.css";
import Pagination from "./Pagination";

const Cinema = () => {
  const cinema = useSelector((state) => state.cinema.cinema);
  const token = useSelector((state) => state.application.token);
  const dispatch = useDispatch();

  // !! ФИЛЬТР ПО ВСЕМ КЛЮЧАМ ФИЛЬМА
  const [value, setValue] = useState("");
  const cinemaFilt = cinema.filter((item) => {
    let filteredYearsAndNames =
      item.name.toLowerCase().includes(value.toLowerCase().toString()) ||
      item.year.toLowerCase().includes(value.toLowerCase().toString());
    let filteredGenres = item.genres.filter((i) =>
      i.genres.toLowerCase().includes(value.toLowerCase().toString())
    );
    let filteredTags = item.tags.filter((i) =>
      i.tags.toLowerCase().includes(value.toLowerCase().toString())
    );
    let filteredActors = item.actors.filter((i) =>
      i.fullname.toLowerCase().includes(value.toLowerCase().toString())
    );
    let allFilters =
      filteredYearsAndNames ||
      filteredGenres.length ||
      filteredActors.length ||
      filteredTags.length;

    return allFilters;
  });

  // !! МОДАЛКА ДЛЯ ВЫБОРА: АВТОРИЗАЦИЯ/РЕГИСТРАЦИЯ/ВЫХОД
  const [modal, setModal] = useState(false);
  const handleOpenModalHeader = () => {
    setModal(true);
  };
  const handleCloseModalHeader = () => {
    setModal(false);
  };

  // !! МОДАЛКА ДЛЯ РЕГИСТРАЦИИ
  const [auths, setAuths] = useState(false);
  const handleOpenModalAuth = () => {
    setModal(false);
    setLogins(false);
    setAuths(true);
  };

  // !! МОДАЛКА ДЛЯ АВТОРИЗАЦИИ
  const [logins, setLogins] = useState(false);
  const handleOpenModalLogin = () => {
    setModal(false);
    setAuths(false);
    setLogins(true);
  };

  // !! ВЫХОД ИЗ АККАУНТА
  const handleOpenModalExit = () => {
    localStorage.clear(); // для очистки localStorage
    window.location.reload(); // для перезагрузки страницы
  };

  useEffect(() => {
    dispatch(fetchCinema());
  }, [dispatch]);

  return (
    <div className={styles.mainWrapperCinema}>
      <div className={styles.card}>
        <div className={styles.tools}>
          <h4>CINEMA</h4>

          {/* SEARCH GATE */}
          <div className={styles.search}>
            <ion-icon name="search-outline"></ion-icon>
            <input
              type="text"
              placeholder="Поиск фильма, по названию, по жанрам, по актерам, по тегам, по годам..."
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
            {value ? (
              <ion-icon
                onClick={() => setValue("")}
                name="close-outline"
              ></ion-icon>
            ) : null}
          </div>

          <div className={styles.icons}>
            {token ? (
              // !! если пользователь авторизован
              <ion-icon
                name="person-circle-outline"
                onClick={handleOpenModalHeader}
              ></ion-icon>
            ) : (
              // !! если пользователь не авторизован
              <ion-icon
                name="filter-circle-outline"
                onClick={handleOpenModalHeader}
              ></ion-icon>
            )}

            {!modal ? null : ( // !! модалка для выбора авторизация/регистрация/выход
              <div className={styles.modalHeaderAuth}>
                <span>
                  <ion-icon
                    name="close-circle-outline"
                    onClick={handleCloseModalHeader}
                  ></ion-icon>
                </span>
                {!token ? (
                  <>
                    <div onClick={handleOpenModalAuth}>Регистрация</div>
                    <div onClick={handleOpenModalLogin}>Авторизация</div>
                  </>
                ) : null}
                {token ? <div onClick={handleOpenModalExit}>Выйти</div> : null}
              </div>
            )}
          </div>
        </div>

        <div className={styles.cardContent}>
          {!cinemaFilt.length ? ( // !! Блок для рендера карточек фильмов
            <div className={styles.spinner}>
              <h1>Ничего нет!</h1>
            </div>
          ) : (
            cinemaFilt.map((item) => {
              return <CinemaCard item={item} key={item._id} />;
            })
          )}
        </div>

        {/* ПАГИНАЦИЯ */}
        <Pagination />

        {auths ? ( // !! модалка для регистрации
          <div className={styles.authModal}>
            <SignUpModal setAuths={setAuths} setLogins={setLogins} />
          </div>
        ) : null}

        {logins ? ( // !! модалка для авторизации
          <div className={styles.loginModal}>
            <SignInModal setLogins={setLogins} setAuths={setAuths} />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Cinema;
