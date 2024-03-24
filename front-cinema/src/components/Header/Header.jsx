import React from "react";
import cls from "./Header.module.css";
import avatarIcon from "../../assets/avatar.jpg";
import { Avatar } from "../../widgets/Avatar";
import { Logo } from "../../widgets/Logo";
import { Input } from "../../widgets/Input";
import { getUserName } from "../utils/utils";
import { useSelector } from "react-redux";
import { LOGO_NAME } from "../utils/constants";
import { Button } from "../../widgets/Button/ui/Button";
import { Icon } from "../../widgets/Icon";

export const Header = ({
  value,
  setValue,
  modal,
  handleOpenModalHeader,
  handleOpenModalLogin,
  handleOpenModalExit,
}) => {
  const token = useSelector((state) => state.application.token);
  const login = useSelector((state) => state.application);
  const users = useSelector((state) => state.users.users);
  const userName = getUserName(users, login);

  return (
    <header className={cls.header}>
      <Logo title={LOGO_NAME} />
      <div className={cls.searchWrapper}>
        <Input value={value} setValue={setValue} />
        <Button className={cls.searchBtn}>
          <Icon
            name="heart-outline"
          />
        </Button>
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
                    <span>{userName}</span>
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
      </div>
    </header>
  );
};
