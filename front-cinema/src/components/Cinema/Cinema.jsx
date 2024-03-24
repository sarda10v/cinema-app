import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCinema } from "../../features/cinemaSlice";
import { fetchUsers } from "../../features/usersSlice";

import { useSearchCinema } from "../utils/utils";
import { Header } from "../Header/Header";
// import { Pagination } from "../../widgets/Pagination";
import { logout } from "../../features/applicationSlice";
import { Modal } from "../../widgets/Modal/ui/Modal";

import CinemaCard from "../CinemaCard/CinemaCard";
import Loader from "../../widgets/Loader/Loader";
import cls from "./Cinema.module.css";

export const Cinema = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [value, setValue] = useState("");
  const [modal, setModal] = useState(false);
  const [auths, setAuths] = useState(false);
  const [logins, setLogins] = useState(false);

  const { cinema, loader } = useSelector((state) => state.cinema);
  const filteredCinema = useSearchCinema(cinema, value);

  const handleOpenModalHeader = () => {
    setModal(!modal);
  };
  const handleOpenModalLogin = () => {
    setModal(false);
    setAuths(false);
    setLogins(true);
  };
  const handleOpenModalExit = () => {
    dispatch(logout());
    setModal(false);
  };
  const handleCloseModal = (e) => {
    if (e.target.classList.contains(cls.wrapperModal)) {
      setAuths(false);
      setLogins(false);
    }
  };

  useEffect(() => {
    dispatch(fetchCinema(page));
    dispatch(fetchUsers());
  }, [dispatch, page]);

  return (
    <div className={cls.wrapper}>
      <div className={cls.card}>
        <Header
          value={value}
          setValue={setValue}
          modal={modal}
          handleOpenModalLogin={handleOpenModalLogin}
          handleOpenModalHeader={handleOpenModalHeader}
          handleOpenModalExit={handleOpenModalExit}
        />
        <div className={cls.cardContent}>
          {!filteredCinema.length || loader ? (
            <Loader />
          ) : (
            filteredCinema.map((item) => {
              return <CinemaCard item={item} key={item._id} />;
            })
          )}
        </div>
        {/* <Pagination page={page} setPage={setPage} /> */}
        <Modal
          auths={auths}
          logins={logins}
          setAuths={setAuths}
          setLogins={setLogins}
          handleCloseModal={handleCloseModal}
        />
      </div>
    </div>
  );
};
