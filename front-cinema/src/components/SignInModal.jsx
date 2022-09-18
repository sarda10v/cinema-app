import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers } from "../features/usersSlice";
import { authSignIn } from "../features/applicationSlice";
import styles from "../css/SignModal.module.css";

const SignInModal = ({ setLogins, setAuths }) => {
  const error = useSelector((state) => state.application.error);
  const signingIn = useSelector((state) => state.application.signingIn);
  const token = useSelector((state) => state.application.token);
  const dispatch = useDispatch();

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  // !! FORM: LOGIN, PASSWORD и BUTTON
  const handleSetName = (e) => {
    setLogin(e.target.value);
  };
  const handleSetPass = (e) => {
    setPassword(e.target.value);
  };
  const handleSignUp = (e) => {
    e.preventDefault();
    dispatch(authSignIn({ login, password }));
  };

  // !! ФУНКЦИЯ ЗАКРЫТИЯ МОДАЛКИ АВТОРИЗАЦИИ
  const handleCloseModalLogin = () => {
    setLogins(false);
  };

  // !! ПЕРЕЙТИ НА РЕГИСТРАЦИЮ
  const handleOpenModalAuth = () => {
    setAuths(true);
    setLogins(false);
  };

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <div className={styles.divFlex}>
      <h3>АВТОРИЗАЦИЯ</h3>
      {/* FORM */}
      <form onSubmit={handleSignUp}>
        <input
          type="text"
          value={login}
          onChange={handleSetName}
          placeholder="Ваш логин"
        />
        <input
          type="password"
          value={password}
          onChange={handleSetPass}
          placeholder="Ваш пароль"
        />
        {/* ПРОВЕРКИ */}
        {signingIn ? <div>Loading...</div> : null}
        {error ? <div>{error}</div> : null}
        {token
          ? <div>Вы успешно авторизованны!</div> && setLogins(false)
          : null}
        {/* для закрытия модалки, если все успешно, нужно поставить setTimeout на 3с */}

        <button type="sumbit">Войти</button>
        <button onClick={handleOpenModalAuth}>Регистрация </button>
        <button onClick={handleCloseModalLogin}>закрыть</button>
      </form>
    </div>
  );
};

export default SignInModal;
