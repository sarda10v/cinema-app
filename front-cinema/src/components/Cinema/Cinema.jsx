import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCinema } from "../../features/cinemaSlice";
import CinemaCard from "../CinemaCard/CinemaCard";
import SignUpModal from "../Sing/SignUpModal";
import SignInModal from "../Sing/SignInModal";
import styles from "./Cinema.module.css";
import Pagination from "../Pagination/Pagination";
import avatarIcon from "../assets/avatar.png";
import { fetchUsers } from "../../features/usersSlice";
import Loader from "../Loader/Loader";

const Cinema = () => {
  const cinema = useSelector((state) => state.cinema.cinema); 
  const loader = useSelector((state) => state.cinema.loader); 
  const token = useSelector((state) => state.application.token);
  const login = useSelector((state) => state.application);
  const users = useSelector((state) => state.users.users);

  const dispatch = useDispatch();

  const userName = users.filter((user) => user._id === login.id);

  // !! ФИЛЬТР ПО ВСЕМ КЛЮЧАМ ФИЛЬМА
  const [value, setValue] = useState("");
  const filteredFilms = cinema.filter((item) => {
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

  const [page, setPage] = useState(1);
  useEffect(() => {
    dispatch(fetchCinema(page));
    dispatch(fetchUsers());
  }, [dispatch, page]);

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
            <div className={styles.userName}>
              {userName.map((i) => i.login)}
            </div>

            {token ? (
              // !! если пользователь авторизован
              <div
                className={styles.avatarWrapper}
                onClick={handleOpenModalHeader}
              >
                <img src={avatarIcon} alt="avatar" />
              </div>
            ) : (
              // дефолтная иконка
              // <ion-icon
              //   name="person-circle-outline"
              //   onClick={handleOpenModalHeader}
              // ></ion-icon>
              // !! если пользователь не авторизован
              <ion-icon
                name="filter-circle-outline"
                onClick={handleOpenModalHeader}
              ></ion-icon>
            )}
            {!modal ? null : ( // !! модалка для выбора авторизация/регистрация/выход
              <div className={styles.modalHeaderAuth}>
                <div className={styles.closeModalAuthBtn}>
                  <ion-icon
                    name="close-circle-outline"
                    onClick={handleCloseModalHeader}
                  ></ion-icon>
                </div>
                {!token ? (
                  <div className={styles.modalAuthBtnHover}>
                    <div onClick={handleOpenModalAuth}>Регистрация</div>
                    <div onClick={handleOpenModalLogin}>Авторизация</div>
                  </div>
                ) : null}
                {token ? <div onClick={handleOpenModalExit}>Выйти</div> : null}
              </div>
            )}
          </div>
        </div>
        <div className={styles.cardContent}>
          {!filteredFilms.length || loader ? ( // !! Блок для рендера карточек фильмов
            <div className={styles.spinner}>
              <Loader/>
            </div>
          ) : (
            filteredFilms.map((item) => {
              return <CinemaCard item={item} key={item._id} />;
            })
          )}
        </div>
        {/* ПАГИНАЦИЯ */}
        <Pagination page={page} setPage={setPage} />

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
