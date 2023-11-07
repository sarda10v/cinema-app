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
import useSearchCinema from '../../hooks/use-search-cinema'
import { Avatar } from "../../widgets/Avatar";
// import { Title } from "../../widgets/Title";
import { Logo } from "../../widgets/Logo";
import { Input } from "../../widgets/Input";
// import { Pagination } from "../../widgets/Pagination";
import { Icon } from "../../widgets/Icon";

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


  const filteredCinema = useSearchCinema(cinema, value);

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
    <div className={cls.mainWrapperCinema}>
      <div className={cls.card}>
        <header className={cls.header}>
          <Logo title="CINEMA" />
          <Input value={value} setValue={setValue} />

          <div className={cls.icons}>
            {/* <Title text={userName.map((i) => i.login)} /> */}

            <Avatar
              url={token ? avatarIcon : null}
              handleOpenModal={handleOpenModalHeader}
            />

            {!modal ? null : ( // !! модалка для выбора авторизация/регистрация/выход
              <div className={cls.modalHeaderAuth}>
                <div className={cls.closeModalAuthBtn}>
                  <Icon
                    name="close-circle-outline"
                    onClick={handleCloseModalHeader}
                  />
                </div>
                {!token ? (
                  <div className={cls.modalAuthBtnHover}>
                    <div onClick={handleOpenModalAuth}>Регистрация</div>
                    <div onClick={handleOpenModalLogin}>Авторизация</div>
                  </div>
                ) : null}
                {token ? <div onClick={handleOpenModalExit}>Выйти</div> : null}
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
