export const trimString = (string, number) => {
  if (string) {
    if (string.length > number) return string.substring(3, number) + "...  ";
  }
};
