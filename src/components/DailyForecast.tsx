import getDay from "../Helper/getDay";
import getWeatherDetails from "../Helper/getWeatherDetails";
import React from "react";
import getFahrenheit from "../Helper/getFahrenehit";
import { UnitContext } from "../Context/UnitContextProvider";

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

export default function DailyForecast({
  status,
  weatherData,
}: {
  status: statusType;
  weatherData: weatherDataType | null;
}) {
  const { tempUnit } = React.useContext(UnitContext)!;
  if (status === "loading") {
    return (
      <div className="mx-auto max-w-[1200px] pt-8">
        <h2 className="pb-2 text-2xl font-bold text-neutral-100">
          Daily Forecast
        </h2>
        <div className="flex flex-wrap gap-2">
          <div className="h-[150px] min-w-[100px] rounded-2xl bg-neutral-700"></div>
          <div className="h-[150px] min-w-[100px] rounded-2xl bg-neutral-700"></div>
          <div className="h-[150px] min-w-[100px] rounded-2xl bg-neutral-700"></div>
          <div className="h-[150px] min-w-[100px] rounded-2xl bg-neutral-700"></div>
          <div className="h-[150px] min-w-[100px] rounded-2xl bg-neutral-700"></div>
          <div className="h-[150px] min-w-[100px] rounded-2xl bg-neutral-700"></div>
        </div>
      </div>
    );
  }

  if (status === "success") {
    const maxTempArr = weatherData?.daily?.temperature_2m_max;
    const minTempArr = weatherData?.daily?.temperature_2m_min;
    const timeArr = weatherData?.daily?.time;
    const weatherCodeArr = weatherData?.daily?.weather_code;

    const dayArr = timeArr?.map((item) => {
      return getDay(item, "short");
    });
    const imgDetailsArr = weatherCodeArr?.map((item) => {
      return getWeatherDetails(item);
    });

    return (
      <div className="pt-8">
        <h2 className="pb-2 text-xl font-bold text-neutral-100">
          Daily Forecast
        </h2>
        <div className="flex flex-wrap content-center gap-2 text-neutral-200">
          {dayArr?.map((item, index) => {
            return (
              <div
                key={index}
                className="flex h-[150px] w-[90px] flex-col gap-2 rounded-2xl bg-neutral-700 px-2 py-3 text-[1rem]"
              >
                <div className="text-center">{item}</div>
                <div className="mx-auto h-[4rem] w-[4rem]">
                  <img
                    src={imgDetailsArr?.[index].src}
                    alt={imgDetailsArr?.[index].alt}
                  />
                </div>
                {tempUnit === "metric" && (
                  <div className="flex justify-between text-[.9rem]">
                    <span>{minTempArr?.[index]}&deg;</span>
                    <span>{maxTempArr?.[index]}&deg;</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
