import { OpenWeatherTempScale } from "./api";
export interface LocalStorageItem {
  cities?: string[];
  options?: LocalStrorageOptions;
}
export type localStorageKeys = keyof LocalStorageItem;

export interface LocalStrorageOptions {
  hasOverlay: boolean;
  homeCity: string;
  tempScale: OpenWeatherTempScale;
}

export const setStoredCities = (cities: string[]): Promise<void> => {
  const vals: LocalStorageItem = {
    cities,
  };
  return new Promise((resolve) => {
    chrome.storage.local.set(vals, () => {
      resolve();
    });
  });
};

export function getStoredCities(): Promise<string[]> {
  const keys: localStorageKeys[] = ["cities"];
  return new Promise((resolve) => {
    chrome.storage.local.get(keys, (res) => {
      resolve(res.cities ?? []);
    });
  });
}

export const setStoredOptions = (
  options: LocalStrorageOptions
): Promise<void> => {
  const vals = {
    options,
  };
  return new Promise((resolve) => {
    chrome.storage.local.set(vals, () => {
      resolve();
    });
  });
};

export const getStoredOptions = (): Promise<LocalStrorageOptions> => {
  const keys: localStorageKeys[] = ["options"];
  return new Promise((resolve) => {
    chrome.storage.local.get(keys, (res) => {
      resolve(res.options);
    });
  });
};
