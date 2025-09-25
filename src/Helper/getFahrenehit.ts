type celsiusType = number;
export default function getFahrenheit(celsius: celsiusType) {
  return Math.ceil(celsius * (9 / 5) + 32);
}
