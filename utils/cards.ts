export const lastDigits = (txt: string | number, quantity: number) => {
  const str = String(txt);
  return str.slice(-quantity);
};

export const isExpired = (expiration_date: string) => {
  const [monthExp, yearExp] = expiration_date.split("/");
  const year = String(new Date().getFullYear());
  const month = String(new Date().getMonth() + 1);

  return yearExp < year || (yearExp == year && monthExp < month);
};
