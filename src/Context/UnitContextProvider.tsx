import React from "react";
interface UnitContextValue {
  unit: UnitSystem;
  switchToMetric: () => void;
  switchToImperial: () => void;
  tempUnit: UnitSystem;
  switchTempToMetric: () => void;
  switchTempToImperial: () => void;
  speedUnit: UnitSystem;
  switchSpeedToMetric: () => void;
  switchSpeedToImperial: () => void;
  precipitationUnit: UnitSystem;
  switchPrecipitationToMetric: () => void;
  switchPrecipitationToImperial: () => void;
}
type UnitSystem = "metric" | "imperial";
// eslint-disable-next-line react-refresh/only-export-components
export const UnitContext = React.createContext<UnitContextValue | null>(null);

type UnitContextProviderProps = {
  children: React.ReactNode;
};
export default function UnitContextProvider({
  children,
}: UnitContextProviderProps) {
  const [unit, setUnit] = React.useState<UnitSystem>("metric");
  function switchToMetric() {
    setUnit("metric");
    setTempUnit("metric");
    setSpeedUnit("metric");
    setPrecipitationUnit("metric");
  }
  function switchToImperial() {
    setUnit("imperial");
    setTempUnit("imperial");
    setSpeedUnit("imperial");
    setPrecipitationUnit("imperial");
  }
  const [tempUnit, setTempUnit] = React.useState<UnitSystem>("metric");
  function switchTempToMetric() {
    setTempUnit("metric");
  }
  function switchTempToImperial() {
    setTempUnit("imperial");
  }
  const [speedUnit, setSpeedUnit] = React.useState<UnitSystem>("metric");
  function switchSpeedToMetric() {
    setSpeedUnit("metric");
  }
  function switchSpeedToImperial() {
    setSpeedUnit("imperial");
  }
  const [precipitationUnit, setPrecipitationUnit] =
    React.useState<UnitSystem>("metric");
  function switchPrecipitationToMetric() {
    setPrecipitationUnit("metric");
  }
  function switchPrecipitationToImperial() {
    setPrecipitationUnit("imperial");
  }

  return (
    <UnitContext.Provider
      value={{
        unit,
        switchToMetric,
        switchToImperial,
        speedUnit,
        switchSpeedToMetric,
        switchSpeedToImperial,
        tempUnit,
        switchTempToMetric,
        switchTempToImperial,
        precipitationUnit,
        switchPrecipitationToMetric,
        switchPrecipitationToImperial,
      }}
    >
      {children}
    </UnitContext.Provider>
  );
}
