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

type combinedArrayProps = {
  temperature: number | undefined;
  imageDetails:
    | {
        src: string;
        alt: string;
      }
    | undefined;
  weekDay: string | undefined;
  hour: string | undefined;
};

import React from "react";
import getWeatherDetails from "../Helper/getWeatherDetails";
import getDay from "../Helper/getDay";
import getHour from "../Helper/getHour";
import { UnitContext } from "../Context/UnitContextProvider";
import getFahrenheit from "../Helper/getFahrenehit";

export default function HourlyForecast({
  status,
  weatherData,
}: {
  status: statusType;
  weatherData: weatherDataType | null;
}) {
  const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const [selectedDay, setSelectedDay] = React.useState("");
  const [displayArr, setDisplayArr] = React.useState<combinedArrayProps[]>([]);
  React.useEffect(() => {
    if (status === "success") {
      const temperatureArr = weatherData?.hourly.apparent_temperature;
      const weatherCodeArr = weatherData?.hourly.weather_code;
      const timeArr = weatherData?.hourly.time;
      const weeklyHours = 168;
      const imageDetails = weatherCodeArr?.map((code) =>
        getWeatherDetails(code),
      );
      const weekDay = timeArr?.map((timePeriod) => getDay(timePeriod, "long"));
      const hour = timeArr?.map((timePeriod) => getHour(timePeriod));

      const combinedArr = Array.from({ length: weeklyHours }, (_, i) => {
        return {
          temperature: temperatureArr?.[i],
          imageDetails: imageDetails?.[i],
          weekDay: weekDay?.[i],
          hour: hour?.[i],
        };
      });

      setSelectedDay(combinedArr[0].weekDay ?? "");
      setDisplayArr(combinedArr);
    }
  }, [status, weatherData]);

  const { tempUnit } = React.useContext(UnitContext)!;

  if (status === "loading") {
    return (
      <aside className="mx-4 md:h-0 md:flex-1">
        <div className="rounded-2xl bg-neutral-800 text-neutral-50">
          <div className="flex justify-between px-4 pt-4">
            <label htmlFor="hourly-forecast">Hourly Forecast</label>
            <select className="cursor-pointer bg-neutral-800">
              <option className="text-[1rem]">-</option>
            </select>
          </div>
          <div className="md:overflow-none flex max-h-[500px] flex-col gap-4 overflow-auto px-2 pt-4 md:max-h-full">
            <div className="flex flex-col justify-between gap-2 rounded-xl bg-neutral-700">
              <div className="h-[3.5rem] w-full rounded-[6px] bg-neutral-600"></div>
              <div className="h-[3.5rem] rounded-[6px] bg-neutral-600"></div>
              <div className="h-[3.5rem] rounded-[6px] bg-neutral-600"></div>
              <div className="h-[3.5rem] rounded-[6px] bg-neutral-600"></div>
              <div className="h-[3.5rem] rounded-[6px] bg-neutral-600"></div>
              <div className="h-[3.5rem] rounded-[6px] bg-neutral-600"></div>
              <div className="h-[3.5rem] rounded-[6px] bg-neutral-600"></div>
              <div className="h-[3.5rem] rounded-[6px] bg-neutral-600"></div>
              <div className="h-[3.5rem] rounded-[6px] bg-neutral-600"></div>
              <div className="h-[3.5rem] rounded-[6px] bg-neutral-600"></div>
              <div className="h-[3.5rem] rounded-[6px] bg-neutral-600"></div>
              <div className="h-[3.5rem] rounded-[6px] bg-neutral-600"></div>
              <div className="h-[3.5rem] rounded-[6px] bg-neutral-600"></div>
            </div>
          </div>
        </div>
      </aside>
    );
  }
  if (status === "success") {
    return (
      <aside className="mx-4 md:h-0 md:flex-1">
        <div className="rounded-2xl bg-neutral-800 text-neutral-50">
          <div className="flex justify-between px-4 pt-4">
            <label htmlFor="hourly-forecast">Hourly Forecast</label>
            <select
              className="cursor-pointer bg-neutral-800"
              name="hourly-forecast"
              id="hourly-forecast"
              value={selectedDay}
              onChange={(e) => setSelectedDay(e.target.value)}
            >
              {weekdays.map((day) => (
                <option key={day} value={day} className="text-[1rem]">
                  {day}
                </option>
              ))}
            </select>
          </div>
          <div className="md:overflow-none flex max-h-[500px] flex-col gap-4 overflow-auto px-2 pt-4 md:max-h-full">
            {displayArr.map((item) => {
              if (item.weekDay === selectedDay) {
                return (
                  <div
                    key={item.hour}
                    className="flex items-center justify-between rounded-xl bg-neutral-700 pr-4"
                  >
                    <div className="flex items-center gap-2">
                      <div className="h-[4rem] w-[4rem]">
                        <img
                          src={item.imageDetails?.src}
                          alt={item.imageDetails?.alt}
                          className="h-full w-full"
                        ></img>
                      </div>
                      <div>{item.hour}</div>
                    </div>
                    <div>
                      {tempUnit === "metric"
                        ? item.temperature
                        : getFahrenheit(item.temperature)}
                      &deg;
                    </div>
                  </div>
                );
              }
            })}
          </div>
        </div>
      </aside>
    );
  }
}
