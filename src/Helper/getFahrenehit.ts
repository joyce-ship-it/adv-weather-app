type celsiusType = number | undefined;
export default function getFahrenheit(celsius: celsiusType) {
  if (celsius === undefined) return "--";
  return Math.round(celsius * (9 / 5) + 32);
}
