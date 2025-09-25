type kphType = number;
export default function getMiles(kph: kphType) {
  return Math.ceil(kph / 1.60934);
}
