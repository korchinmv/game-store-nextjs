export const cropFunction = (array, startpoint, endpoint) => {
  const newArray = array.slice(startpoint, endpoint);
  return newArray;
};
