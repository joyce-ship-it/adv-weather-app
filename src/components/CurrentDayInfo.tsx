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

import React from "react";
import { UnitContext } from "../Context/UnitContextProvider";
import getFahrenheit from "../Helper/getFahrenehit";
import getMiles from "../Helper/getMiles";
import getInches from "../Helper/getInches";

export default function CurrentDayInfo({
  status,
  weatherData,
}: {
  status: statusType;
  weatherData: weatherDataType | null;
}) {
  const { tempUnit, speedUnit, precipitationUnit } =
    React.useContext(UnitContext)!;
  if (status === "loading") {
    return (
      <div className="flex flex-wrap gap-4 pt-4 text-neutral-200">
        <article className="flex min-h-[100px] min-w-[150px] flex-1 flex-col justify-between rounded-[.8rem] bg-neutral-700 p-4">
          <h3>Feels Like</h3>
          <span>_</span>
        </article>
        <article className="flex min-h-[120px] min-w-[150px] flex-1 flex-col justify-between rounded-[.8rem] bg-neutral-700 p-4">
          <h3>Humidity</h3>
          <span>_</span>
        </article>
        <article className="flex min-h-[120px] min-w-[150px] flex-1 flex-col justify-between rounded-[.8rem] bg-neutral-700 p-4">
          <h3>Wind</h3>
          <span>_</span>
        </article>
        <article className="flex min-h-[120px] min-w-[150px] flex-1 flex-col justify-between rounded-[.8rem] bg-neutral-700 p-4">
          <h3>Precipitation</h3>
          <span>_</span>
        </article>
      </div>
    );
  }
  if (status === "success") {
    const feelsLike = weatherData?.current?.temperature_2m;
    const humidity = weatherData?.current?.relative_humidity_2m;
    const windSpeed = weatherData?.current?.wind_speed_10m;
    const precipitation = weatherData?.current?.precipitation;

    return (
      <div className="flex flex-wrap gap-4 pt-4 text-neutral-200">
        <article className="flex h-[100px] min-w-[150px] flex-1 flex-col justify-between rounded-[.8rem] bg-neutral-700 p-4">
          <h3>Feels Like</h3>
          {tempUnit === "metric" && (
            <span className="text-neutral-000 text-3xl">{feelsLike}&deg;</span>
          )}
          {tempUnit === "imperial" && (
            <span className="text-neutral-000 text-3xl">
              {getFahrenheit(feelsLike!)}&deg;
            </span>
          )}
        </article>
        <article className="flex h-[100px] min-w-[150px] flex-1 flex-col justify-between rounded-[.8rem] bg-neutral-700 p-4">
          <h3>Humidity</h3>
          <span className="text-neutral-000 text-3xl">{humidity}%</span>
        </article>
        <article className="flex h-[100px] min-w-[150px] flex-1 flex-col justify-between rounded-[.8rem] bg-neutral-700 p-4">
          <h3>Wind</h3>
          {speedUnit === "metric" && (
            <span className="text-neutral-000 text-3xl">{windSpeed} kph</span>
          )}
          {speedUnit === "imperial" && (
            <span className="text-neutral-000 text-3xl">
              {getMiles(windSpeed!)} mph
            </span>
          )}
        </article>
        <article className="flex h-[100px] min-w-[150px] flex-1 flex-col justify-between rounded-[.8rem] bg-neutral-700 p-4">
          <h3>Precipitation</h3>
          {precipitationUnit === "metric" && (
            <span className="text-neutral-000 text-3xl">
              {precipitation} mm
            </span>
          )}
          {precipitationUnit === "imperial" && (
            <span className="text-neutral-000 text-3xl">
              {getInches(precipitation!)} in
            </span>
          )}
        </article>
      </div>
    );
  }
}
