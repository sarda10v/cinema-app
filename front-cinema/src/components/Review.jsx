import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchReviews,
  addNewReview,
  deleteReview,
  addLikeInReview,
  removeLikeInReview,
} from "../features/reviewsSlice";
import { useParams } from "react-router-dom";
import styles from "../css/Review.module.css";

const Review = () => {
  const reviews = useSelector((state) => state.review.review);
  const token = useSelector((state) => state.application.token);
  const userId = useSelector((state) => state.application.id);
  const [text, setText] = useState("");
  const dispatch = useDispatch();
  const { id } = useParams();

  const handleAddReview = () => {
    dispatch(addNewReview({ text, userId, id }));
    setText("");
  };

  const handleDeleteBtn = (id) => {
    if (token) {
      dispatch(deleteReview(id));
    }
  };
  const handleAddLike = (i, userId) => {
    if (reviews[0].like.find((i) => i._id === userId)) {
      return dispatch(removeLikeInReview({ i, userId }));
    }
    dispatch(addLikeInReview({ i, userId }));
  };
  const handleAddEnter = (e) => {
    const code = e.keyCode || e.which;
    if (code === 13) {
      handleAddReview();
    }
  };

  useEffect(() => {
    dispatch(fetchReviews());
  }, [dispatch]);

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
                        {i.like.length}
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
          <button onClick={handleAddReview}>Добавить</button>
        </div>
      ) : (
        <div>
          Только авторизованный пользователь может оставлять комментарии.
        </div>
      )}
    </div>
  );
};

export default Review;
