export default function getDay(dateStr: string, size: "short" | "long") {
  const date = new Date(dateStr);
  const day = date.toLocaleDateString("en-US", { weekday: size });
  return day;
}
