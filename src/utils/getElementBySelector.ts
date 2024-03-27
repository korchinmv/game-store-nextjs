export const getElementBySelector = (name: string) => {
  let storeHeaderLink = document.querySelector(name);

  return storeHeaderLink;
};
