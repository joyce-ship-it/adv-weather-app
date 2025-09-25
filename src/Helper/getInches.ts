type mmType = number;
export default function (mm: mmType) {
  return Math.ceil(mm / 25.4);
}
