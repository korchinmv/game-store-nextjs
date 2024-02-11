export const checkRatingForColor = (number) => {
  if (number % 1 === 0 && number > 5) {
    if (number >= 70) {
      return "bg-[--green-color]";
    } else if (number >= 50 && number < 70) {
      return "bg-[--yellow-color]";
    } else if (number >= 0 && number < 50) {
      return "bg-[--red-color]";
    }
  } else if (
    (number % 1 !== 0 && number <= 5) ||
    (number % 1 === 0 && number <= 5)
  ) {
    if (number >= 4 && number < 5.1) {
      return "bg-[--green-color]";
    } else if (number >= 3 && number < 4) {
      console.log(number);
      return "bg-[--yellow-color]";
    } else if (number >= 0 && number < 3) {
      return "bg-[--red-color]";
    }
  }
};
