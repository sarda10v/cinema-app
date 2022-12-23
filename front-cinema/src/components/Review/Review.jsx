import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchReviews,
  addNewReview,
  deleteReview,
  addLikeInReview,
  removeLikeInReview,
} from "../../features/reviewsSlice";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import styles from "./Review.module.css";

const Review = () => {
  const reviews = useSelector((state) => state.review.review);
  const token = useSelector((state) => state.application.token);
  const userId = useSelector((state) => state.application.id);
  const [text, setText] = useState("");
  const dispatch = useDispatch();
  const { id } = useParams();

  // !! ДОБАВЛЕНИЕ КОММЕНТАРИЯ
  const handleAddReview = () => {
    dispatch(addNewReview({ text, userId, id }));
    setText("");
  };

  // !! УДАЛЕНИЕ КОММЕНТАРИЯ
  const handleDeleteBtn = (id) => {
    if (token) {
      dispatch(deleteReview(id));
    }
  };

  // !! ДОБАВЛЕНИЕ/УДАЛЕНИЕ ЛАЙКА
  const handleAddLike = (i, userId) => {
    if (reviews[0].like.find((i) => i._id === userId)) {
      return dispatch(removeLikeInReview({ i, userId }));
    }
    dispatch(addLikeInReview({ i, userId }));
  };

  // !! Привязка к ENTER
  const handleAddEnter = (e) => {
    const code = e.keyCode || e.which;
    if (code === 13) {
      handleAddReview();
    }
  };

  useEffect(() => {
    dispatch(fetchReviews());
  }, [dispatch]);

  // !! ФИЛЬТРАЦИЯ КОММЕНТАРИЕВ ОПРЕДЕЛЕННОГО ФИМЬМА
  const filteredReviews = reviews.filter((i) => i.cinema === id);

  return (
    <div className={styles.commentsWrapper}>
      <h5>Отзывы:</h5>
      <div>
        {filteredReviews.map((i) => {
          return (
            <div key={i._id}>
              <div className={styles.commentBox}>
                <div className={styles.commentName}>
                  <ion-icon name="person-circle"></ion-icon> {i.user.login}
                </div>
                {i.user._id === userId ? (
                  <div className={styles.icons}>
                    <button
                      className={styles.iconsDeleteBtn}
                      onClick={() => handleDeleteBtn(i._id)}
                    >
                      <ion-icon name="close"></ion-icon>
                    </button>
                    <button className={styles.iconsPatchBtn}>
                      <ion-icon name="reorder-four-outline"></ion-icon>
                    </button>

                    {/* !! LIKE */}
                    <button
                      className={styles.iconsAddLike}
                      onClick={() => handleAddLike(i._id, userId)}
                    >
                      <div className={styles.likeFalse}>
                        <ion-icon name="heart-outline"></ion-icon>
                        <span>{i.like.length}</span>
                      </div>
                    </button>
                  </div>
                ) : null}
              </div>
              <div className={styles.commentText}>- {i.reviews}</div>
            </div>
          );
        })}
      </div>
      {token ? (
        <div className={styles.commentsInput}>
          <textarea
            name="text"
            id=""
            cols="100"
            rows="100%"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyPress={(e) => handleAddEnter(e)}
          ></textarea>
          <button onClick={handleAddReview} className={styles.addCommBnt}>
            Добавить
          </button>
        </div>
      ) : (
        <div>
          <Link to="/">
            Только авторизованный пользователь может оставлять комментарии!
          </Link>
        </div>
      )}
    </div>
  );
};

export default Review;
