import { configureStore } from "@reduxjs/toolkit";
import cinema from "../features/cinemaSlice";
import review from "../features/reviewsSlice";
import users from "../features/usersSlice";
import application from "../features/applicationSlice";

export const store = configureStore({
  reducer: {
    cinema,
    review,
    users,
    application,
  },
});
