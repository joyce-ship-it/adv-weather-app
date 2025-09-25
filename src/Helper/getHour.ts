export default function getHour(dateStr: string) {
  const date = new Date(dateStr);
  let hour = date.getHours();
  const amOrPm = hour >= 12 ? "PM" : "AM";
  hour = hour % 12 || 12;
  return `${hour} ${amOrPm}`;
}
