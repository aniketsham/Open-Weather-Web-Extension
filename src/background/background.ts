import {
  setStoredCities,
  setStoredOptions,
  getStoredCities,
  getStoredOptions,
} from "../utils/storage";

import { fetchWeatherData } from "../utils/api";
chrome.runtime.onInstalled.addListener(() => {
  setStoredCities([]);
  setStoredOptions({
    hasOverlay: false,
    homeCity: "",
    tempScale: "metric",
  });

  chrome.contextMenus.create({
    contexts: ["selection"],
    title: "Add City to weather extension",
    id: "weatherExtension ",
  });

  chrome.alarms.create({
    periodInMinutes: 60,
  });
});

chrome.contextMenus.onClicked.addListener((event) => {
  getStoredCities().then((cities) => {
    setStoredCities([...cities, event.selectionText]);
  });
});

chrome.alarms.onAlarm.addListener(() => {
  getStoredOptions().then((options) => {
    if (!options.homeCity) {
      return;
    }
    fetchWeatherData(options.homeCity, options.tempScale).then((data) => {
      const temp =
        Math.round(data.main.temp) +
        `${options.tempScale === "metric" ? "\u2103" : "\u2109"}`;
      chrome.action.setBadgeText({
        text: temp,
      });
    });
  });
});
