export const getSessionStorage = (name: string) => {
  const data = sessionStorage.getItem(name);

  if (data) {
    return JSON.parse(data);
  }
  return null;
};
