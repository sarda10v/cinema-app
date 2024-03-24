import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers } from "../../features/usersSlice";
import { authSignUp } from "../../features/applicationSlice";
import styles from "./SignModal.module.css";

const SignUpModal = ({ setAuths, setLogins }) => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [clearInput, setClearInput] = useState(false);
  const { signingUp, error } = useSelector((state) => state.application);
  const dispatch = useDispatch();

  const handleSetName = (e) => {
    setLogin(e.target.value);
  };
  const handleSetPass = (e) => {
    setPassword(e.target.value);
  };
  const handleSignUp = (e) => {
    e.preventDefault();
    setClearInput(true);
    if (login.trim().length && password.trim().length) {
      dispatch(authSignUp({ login, password }));
      setClearInput(false);
      setLogins(true);
      setAuths(false);
    }
  };
  const handleCloseModalAuth = () => {
    setAuths(false);
  };
  const handleOpenModalLogin = () => {
    setLogins(true);
    setAuths(false);
  };

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <div className={styles.divFlex}>
      <h3>Регистрация</h3>
      <form onSubmit={handleSignUp}>
        <input
          type="text"
          value={login}
          onChange={handleSetName}
          placeholder="login"
        />
        <input
          type="password"
          value={password}
          onChange={handleSetPass}
          placeholder="password"
        />
        {signingUp ? <div>Loading...</div> : null}
        {error ? <div>Ник занят!</div> : null}
        {clearInput ? <div>"Заполните все поля"</div> : null}

        <button type="sumbit">Зарегистрироваться</button>
        <button onClick={handleOpenModalLogin}>Авторизация</button>
        <button onClick={handleCloseModalAuth}>close</button>
      </form>
    </div>
  );
};

export default SignUpModal;
