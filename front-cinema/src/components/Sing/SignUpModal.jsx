import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers } from "../../features/usersSlice";
import { authSignUp } from "../../features/applicationSlice";
import cls from "./SignModal.module.css";
import { Button } from "../../widgets/Button/ui/Button";

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
    <div className={cls.divFlex}>
      <h3>Регистрация</h3>
      <form onSubmit={handleSignUp}>
        <input
          type="text"
          value={login}
          className={cls.input}
          onChange={handleSetName}
          placeholder="login"
        />
        <input
          type="password"
          value={password}
          className={cls.input}
          onChange={handleSetPass}
          placeholder="password"
        />
        {signingUp ? <div>Loading...</div> : null}
        {error ? <div>Ник занят!</div> : null}
        {clearInput ? <div>"Заполните все поля"</div> : null}

        <div className={cls.wrapperBtn}>
          <Button className={cls.btn} type="sumbit">
            Войти
          </Button>
          <Button className={cls.btn} onClick={handleOpenModalLogin}>
            Регистрация
          </Button>
          <Button className={cls.btn} onClick={handleCloseModalAuth}>
            Закрыть
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignUpModal;
