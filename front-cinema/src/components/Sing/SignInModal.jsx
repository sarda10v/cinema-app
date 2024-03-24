import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers } from "../../features/usersSlice";
import { authSignIn } from "../../features/applicationSlice";
import cls from "./SignModal.module.css";
import { Button } from "../../widgets/Button/ui/Button";

const SignInModal = ({ setLogins, setAuths }) => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const { signingIn, token, error } = useSelector((state) => state.application);
  const dispatch = useDispatch();

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
  const handleCloseModalLogin = () => {
    setLogins(false);
  };
  const handleOpenModalAuth = () => {
    setAuths(true);
    setLogins(false);
  };

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <div className={cls.divFlex}>
      <h3>АВТОРИЗАЦИЯ</h3>
      <form onSubmit={handleSignUp}>
        <input
          type="text"
          value={login}
          className={cls.input}
          onChange={handleSetName}
          placeholder="Ваш логин"
        />
        <input
          type="password"
          value={password}
          className={cls.input}
          onChange={handleSetPass}
          placeholder="Ваш пароль"
        />
        {signingIn ? <div>Loading...</div> : null}
        {error ? <div>{error}</div> : null}
        {token
          ? <div>Вы успешно авторизованны!</div> && setLogins(false)
          : null}
        <div className={cls.wrapperBtn}>
          <Button className={cls.btn} type="sumbit">
            Войти
          </Button>
          <Button className={cls.btn} onClick={handleOpenModalAuth}>
            Регистрация
          </Button>
          <Button className={cls.btn} onClick={handleCloseModalLogin}>
            Закрыть
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInModal;
