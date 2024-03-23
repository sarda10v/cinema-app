// constants
export const LOGO_NAME = "CINEMA";

// helpers
export const getUserName = (users, login) =>
  users.filter((user) => user._id === login.id);
