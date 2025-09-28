import React from "react";
type statusType = "idle" | "loading" | "success" | "error" | "empty";
type weatherDataType = {
  city: string;
  country: string;
  current: {
    apparent_temperature: number;
    temperature_2m: number;
    wind_speed_10m: number;
    precipitation: number;
    relative_humidity_2m: number;
    time: string;
    weather_code: number;
    is_day: number;
  };
  daily: {
    time: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    weather_code: number[];
  };
  hourly: {
    time: string[];
    weather_code: number[];
    apparent_temperature: number[];
  };
};

import { UnitContext } from "../Context/UnitContextProvider";
import getFahrenheit from "../Helper/getFahrenehit";
import getWeatherDetails from "../Helper/getWeatherDetails";
import { FaMoon } from "react-icons/fa";

export default function Infograph({
  status,
  weatherData,
}: {
  status: statusType;
  weatherData: weatherDataType | null;
}) {
  const { tempUnit } = React.useContext(UnitContext)!;
  if (status === "loading") {
    return (
      <div className="grid min-h-[300px] place-content-center rounded-2xl bg-neutral-700">
        loading...
      </div>
    );
  }

  if (status === "success") {
    const dateStr = weatherData?.current.time ?? "";
    const date = new Date(dateStr);
    const day = date.toLocaleDateString("en-US", { weekday: "long" });
    const month = date.toLocaleDateString("en-US", { month: "short" });
    const dateNum = date.getDate();
    const year = date.getFullYear();
    const formattedDate = `${day}, ${month} ${dateNum}, ${year}`;

    const weatherCode = weatherData?.current?.weather_code;
    const temperature = weatherData?.current?.apparent_temperature;
    const imgDetails = getWeatherDetails(weatherCode);
    const isNight = weatherData?.current?.is_day === 0;
    const isClearSkyNight = isNight && (weatherCode === 0 || weatherCode === 1);

    return (
      <div
        className={`flex min-h-[200px] flex-col gap-6 rounded-2xl bg-[url('/bg-today-small.svg')] bg-cover bg-no-repeat p-4 md:flex md:flex-row md:items-center md:justify-between md:bg-[url('/bg-today-large.svg')]`}
      >
        <div className="flex flex-col gap-2 pt-8 text-center text-3xl">
          <h2 className="font-bold text-neutral-50">
            {weatherData?.city}, {weatherData?.country}
          </h2>
          <p className="text-[1.2rem] text-neutral-200">{formattedDate}</p>
        </div>
        <div className="flex items-center justify-center gap-4">
          <div className="flex h-[5rem] w-[5rem] items-center justify-center">
            {isClearSkyNight ? (
              <FaMoon size={40} />
            ) : (
              <img
                className="h-full w-full"
                src={imgDetails.src}
                alt={imgDetails.alt}
              />
            )}
          </div>
          {tempUnit === "metric" && (
            <p className="text-7xl font-bold text-neutral-100 italic">
              {temperature}&deg;
            </p>
          )}
          {tempUnit === "imperial" && (
            <p className="text-7xl font-bold text-neutral-100 italic">
              {getFahrenheit(temperature!)}&deg;
            </p>
          )}
        </div>
      </div>
    );
  }
}
