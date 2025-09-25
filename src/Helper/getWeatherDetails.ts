import sunny from "../assets/images/icon-sunny.webp";
import storm from "../assets/images/icon-storm.webp";
import snow from "../assets/images/icon-snow.webp";
import rain from "../assets/images/icon-rain.webp";
import partlyCloudy from "../assets/images/icon-partly-cloudy.webp";
import overcast from "../assets/images/icon-overcast.webp";
import fog from "../assets/images/icon-fog.webp";
import drizzle from "../assets/images/icon-drizzle.webp";
export default function getWeatherDetails(weatherCode: number | undefined) {
  if (weatherCode === 0 || weatherCode === 1) {
    return { src: sunny, alt: "clear sky" };
  } else if (weatherCode === 2) {
    return { src: partlyCloudy, alt: "partly cloudy" };
  } else if (weatherCode === 3) {
    return { src: overcast, alt: "overcast" };
  } else if (weatherCode === 45 || weatherCode === 48) {
    return { src: fog, alt: "fog" };
  } else if (
    weatherCode === 51 ||
    weatherCode === 53 ||
    weatherCode === 55 ||
    weatherCode === 56 ||
    weatherCode === 57
  ) {
    return { src: drizzle, alt: "drizzle" };
  } else if (
    weatherCode === 61 ||
    weatherCode === 63 ||
    weatherCode === 65 ||
    weatherCode === 66 ||
    weatherCode === 67 ||
    weatherCode === 80 ||
    weatherCode === 81 ||
    weatherCode === 82
  ) {
    return { src: rain, alt: "rain" };
  } else if (
    weatherCode === 71 ||
    weatherCode === 73 ||
    weatherCode === 75 ||
    weatherCode === 77 ||
    weatherCode === 85 ||
    weatherCode === 86
  ) {
    return { src: snow, alt: "snow" };
  } else {
    return { src: storm, alt: "storm" };
  }
}
