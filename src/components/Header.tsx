import logo from "../assets/images/logo.svg";
import units from "../assets/images/icon-units.svg";
import dropdownIcon from "../assets/images/icon-dropdown.svg";
import checkmarkIcon from "../assets/images/icon-checkmark.svg";
import React from "react";
import { UnitContext } from "../Context/UnitContextProvider";
export default function Header() {
  const val = React.useContext(UnitContext);

  const [isUnitOpen, setIsUnitOpen] = React.useState(false);
  const dropDownRef = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    function handleOutsideClick(e: MouseEvent) {
      if (
        dropDownRef.current &&
        !dropDownRef.current.contains(e.target as Node)
      ) {
        setIsUnitOpen(false);
      }
    }
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);
  function toggleOpen() {
    const currentVal = isUnitOpen;
    setIsUnitOpen(!currentVal);
  }
  return (
    <header className="text-neutral-000 flex items-center justify-between px-2 pt-4">
      <a href="#">
        <div className="w-[10rem]">
          <img src={logo} alt="logo" className="w-full" />
        </div>
      </a>
      <div className="relative">
        <button
          onClick={toggleOpen}
          className="flex cursor-pointer items-center gap-2 rounded-[4px] bg-neutral-800 px-2 py-1"
        >
          <div>
            <img src={units} alt="settings-icon" />
          </div>
          <div>Units</div>
          <div>
            <img src={dropdownIcon} alt="dropdown arrow" />
          </div>
        </button>
        {isUnitOpen && (
          <div
            ref={dropDownRef}
            className="absolute top-10 right-0 z-11 w-[150px] self-stretch rounded-[8px] bg-neutral-800 p-1 text-[1rem]"
          >
            {val?.unit === "metric" ? (
              <button
                className="pb-3 text-neutral-50"
                onClick={val?.switchToImperial}
              >
                Switch to Imperial
              </button>
            ) : (
              <button
                className="pb-3 text-neutral-50"
                onClick={val?.switchToMetric}
              >
                Switch to Metric
              </button>
            )}
            <p className="p-0.5 text-[.9rem] text-neutral-300">Temperature</p>
            <button
              onClick={val?.switchTempToMetric}
              style={
                val?.tempUnit === "metric"
                  ? { backgroundColor: "hsl(243, 23%, 30%)" }
                  : undefined
              }
              className="flex w-full items-center justify-between rounded-[4px] p-1"
            >
              <span>Celsius(&deg;C)</span>
              <span>
                {val?.tempUnit === "metric" && (
                  <img src={checkmarkIcon} alt="checkmark icon" />
                )}
              </span>
            </button>
            <button
              onClick={val?.switchTempToImperial}
              style={
                val?.tempUnit === "imperial"
                  ? { backgroundColor: "hsl(243, 23%, 30%)" }
                  : undefined
              }
              className="flex w-full items-center justify-between p-1 pb-1"
            >
              <span>Fahrenheit(&deg;F)</span>
              <span>
                {val?.tempUnit === "imperial" && (
                  <img src={checkmarkIcon} alt="checkmark icon" />
                )}
              </span>
            </button>
            <hr className="text-neutral-500" />
            <p className="p-0.5 text-[.9rem] text-neutral-300">Wind speed</p>
            <button
              onClick={val?.switchSpeedToMetric}
              style={
                val?.speedUnit === "metric"
                  ? { backgroundColor: "hsl(243, 23%, 30%)" }
                  : undefined
              }
              className="flex w-full items-center justify-between p-1"
            >
              <span>km/h</span>
              <span>
                {val?.speedUnit === "metric" && (
                  <img src={checkmarkIcon} alt="checkmark icon" />
                )}
              </span>
            </button>
            <button
              onClick={val?.switchSpeedToImperial}
              style={
                val?.speedUnit === "imperial"
                  ? { backgroundColor: "hsl(243, 23%, 30%)" }
                  : undefined
              }
              className="flex w-full items-center justify-between p-1"
            >
              <span>mph</span>
              <span>
                {val?.speedUnit === "imperial" && (
                  <img src={checkmarkIcon} alt="checkmark icon" />
                )}
              </span>
            </button>
            <hr className="text-neutral-500" />
            <p className="p-0.5 text-[.9rem] text-neutral-300">Precipitation</p>
            <button
              onClick={val?.switchPrecipitationToMetric}
              style={
                val?.precipitationUnit === "metric"
                  ? { backgroundColor: "hsl(243, 23%, 30%)" }
                  : undefined
              }
              className="flex w-full items-center justify-between p-1"
            >
              <span>Millimeters(mm)</span>
              <span>
                {val?.precipitationUnit === "metric" && (
                  <img src={checkmarkIcon} alt="checkmark icon" />
                )}
              </span>
            </button>
            <button
              onClick={val?.switchPrecipitationToImperial}
              style={
                val?.precipitationUnit === "imperial"
                  ? { backgroundColor: "hsl(243, 23%, 30%)" }
                  : undefined
              }
              className="flex w-full items-center justify-between p-1"
            >
              <span>Inches(in)</span>
              <span>
                {val?.precipitationUnit === "imperial" && (
                  <img src={checkmarkIcon} alt="checkmark icon" />
                )}
              </span>
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
