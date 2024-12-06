const OPEN_WEATHER_API_KEY = "194da7d471e0c8d52d3def5dbbd07a36";

export interface OpenWeatherData {
  name: string;
  main: {
    feels_like: number;
    humidity: number;
    pressure: number;
    temp_max: number;
    temp_min: number;
    temp: number;
  };
  weather: {
    main: string;
    description: string;
    icon: string;
    id: number;
  }[];
  wind: {
    speed: number;
    deg: number;
  };
}

export type OpenWeatherTempScale = "metric" | "imperial";

export const fetchWeatherData = async (
  cityName: string,
  tempScale?: OpenWeatherTempScale
) => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=${
      tempScale ?? "metric"
    }&appid=${OPEN_WEATHER_API_KEY}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch weather data");
  }
  const data: OpenWeatherData = await response.json();
  return data;
};

export function getWeatherIconUrl(iconCode: string): string {
  return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
}
