import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCinema } from "../../features/cinemaSlice";
import CinemaCard from "../CinemaCard/CinemaCard";
import SignUpModal from "../Sing/SignUpModal";
import SignInModal from "../Sing/SignInModal";
import cls from "./Cinema.module.css";
import avatarIcon from "../../assets/avatar.jpg";
import { fetchUsers } from "../../features/usersSlice";
import Loader from "../../widgets/Loader/Loader";
import useSearchCinema from "../../hooks/use-search-cinema";
import { Avatar } from "../../widgets/Avatar";
import { Logo } from "../../widgets/Logo";
import { Input } from "../../widgets/Input";
import { LOGO_NAME, getUserName } from "../utils/utils";
// import { Pagination } from "../../widgets/Pagination";

const Cinema = () => {
  const { cinema, loader } = useSelector((state) => state.cinema);
  const token = useSelector((state) => state.application.token);
  const login = useSelector((state) => state.application);
  const users = useSelector((state) => state.users.users);

  const dispatch = useDispatch();
  const userName = getUserName(users, login);

  // !! ФИЛЬТР ПО ВСЕМ КЛЮЧАМ ФИЛЬМА
  const [value, setValue] = useState("");

  const filteredCinema = useSearchCinema(cinema, value);

  // !! МОДАЛКА ДЛЯ ВЫБОРА: АВТОРИЗАЦИЯ/РЕГИСТРАЦИЯ/ВЫХОД
  const [modal, setModal] = useState(false);
  const handleOpenModalHeader = () => {
    setModal(!modal);
  };

  // !! МОДАЛКА ДЛЯ РЕГИСТРАЦИИ
  const [auths, setAuths] = useState(false);
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
    <div className={cls.mainWrapperCinema}>
      <div className={cls.card}>
        <header className={cls.header}>
          <Logo title={LOGO_NAME} />
          <Input value={value} setValue={setValue} />

          <div className={cls.icons}>
            <Avatar
              url={token ? avatarIcon : null}
              handleOpenModal={handleOpenModalHeader}
            />

            {!modal ? null : (
              <div className={cls.modalHeaderAuth}>
                {!token ? (
                  <div className={cls.modalAuthBtnHover}>
                    <div
                      className={cls.modalAuthBtn}
                      onClick={handleOpenModalLogin}
                    >
                      <ion-icon
                        className={cls.authIcon}
                        name="log-in-outline"
                      ></ion-icon>
                      <span>Войти</span>
                    </div>
                  </div>
                ) : null}
                {token ? (
                  <>
                    <div className={cls.modalUsernameBtn}>
                      <ion-icon name="person-outline"></ion-icon>
                      <span>{userName.map((i) => i.login)}</span>
                    </div>
                    <hr className={cls.hr} />

                    <div className={cls.modalUserOnlineBtn}>
                      <ion-icon name="ellipse"></ion-icon>
                      <span>В сети</span>
                    </div>
                    <div className={cls.modalUserInactiveBtn}>
                      <ion-icon name="ellipse"></ion-icon>
                      <span>Неактивен</span>
                    </div>
                    <div className={cls.modalUserInvisibleBtn}>
                      <ion-icon name="ellipse"></ion-icon>
                      <span>Невидимый</span>
                    </div>
                    <hr className={cls.hr} />
                    <div className={cls.modalFavoritesBtn}>
                      <ion-icon name="star-outline"></ion-icon>
                      <span>Избранное</span>
                    </div>
                    <div className={cls.modalSettingsBtn}>
                      <ion-icon name="settings-outline"></ion-icon>
                      <span>Настройки</span>
                    </div>
                    <div
                      className={cls.modalExitBtn}
                      onClick={handleOpenModalExit}
                    >
                      <ion-icon name="exit-outline"></ion-icon>
                      <span>Выйти</span>
                    </div>
                  </>
                ) : null}
              </div>
            )}
          </div>
        </header>
        <div className={cls.cardContent}>
          {!filteredCinema.length || loader ? (
            <Loader />
          ) : (
            filteredCinema.map((item) => {
              return <CinemaCard item={item} key={item._id} />;
            })
          )}
        </div>
        {/* ПАГИНАЦИЯ */}
        {/* <Pagination page={page} setPage={setPage} /> */}

        {auths ? ( // !! модалка для регистрации
          <div className={cls.authModal}>
            <SignUpModal setAuths={setAuths} setLogins={setLogins} />
          </div>
        ) : null}
        {logins ? ( // !! модалка для авторизации
          <div className={cls.loginModal}>
            <SignInModal setLogins={setLogins} setAuths={setAuths} />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Cinema;
