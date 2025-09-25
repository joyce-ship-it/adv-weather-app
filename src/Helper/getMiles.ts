type kphType = number;
export default function getMiles(kph: kphType) {
  return Math.round(kph / 1.60934);
}
