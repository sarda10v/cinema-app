import React from "react";
import cls from "./Modal.module.css";

import SignUpModal from "../../../components/Sing/SignUpModal";
import SignInModal from "../../../components/Sing/SignInModal";

export const Modal = (props) => {
  const { auths, logins, setAuths, setLogins, handleCloseModal } = props;
  return (
    <>
      {auths ? (
        <div className={cls.wrapperModal} onClick={(e) => handleCloseModal(e)}>
          <div className={cls.authModal}>
            <SignUpModal setAuths={setAuths} setLogins={setLogins} />
          </div>
        </div>
      ) : null}
      {logins ? (
        <div className={cls.wrapperModal} onClick={(e) => handleCloseModal(e)}>
          <div className={cls.loginModal}>
            <SignInModal setLogins={setLogins} setAuths={setAuths} />
          </div>
        </div>
      ) : null}
    </>
  );
};
