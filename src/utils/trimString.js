export const trimString = (string, number) => {
  if (string) {
    if (string.length > number) return string.substring(0, number) + "...  ";
  }
};
