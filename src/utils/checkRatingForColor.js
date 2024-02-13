export const checkRatingForColor = (number) => {
  if (number % 1 === 0 && number > 5) {
    if (number >= 70) {
      return "var(--green-color)";
    } else if (number >= 50 && number < 70) {
      return "var(--yellow-color)";
    } else if (number >= 0 && number < 50) {
      return "var(--red-color)";
    }
  } else if (
    (number % 1 !== 0 && number <= 5) ||
    (number % 1 === 0 && number <= 5)
  ) {
    if (number >= 4 && number < 5.1) {
      return "var(--green-color)";
    } else if (number >= 3 && number < 4) {
      return "var(--yellow-color)";
    } else if (number >= 0 && number < 3) {
      return "var(--red-color)";
    }
  }
};
