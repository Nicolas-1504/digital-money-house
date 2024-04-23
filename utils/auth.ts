export const setAuthStorage = (auth: string) => {
  localStorage.setItem("auth", JSON.stringify(auth));
};

export const getAuthStorage = () => {
  return JSON.parse(localStorage.getItem("auth") as string);
};

export const removeAuthStorage = () => {
  localStorage.removeItem("auth");
};
