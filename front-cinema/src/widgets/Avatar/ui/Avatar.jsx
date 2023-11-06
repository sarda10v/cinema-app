import cls from "./Avatar.module.css";
import defaultIcon from "../../../assets/defaultIcon.png";

export const Avatar = ({ url, handleOpenModal }) => {
  return (
    <div className={cls.wrapper} onClick={handleOpenModal}>
      <img src={url || defaultIcon} alt="avatar" className={cls.avatar} />
    </div>
  );
};
