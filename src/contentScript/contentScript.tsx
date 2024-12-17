import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Card } from "@mui/material";
import WeatherCard from "../components/WeatherCard/WeatherCard";
import { getStoredOptions, LocalStrorageOptions } from "../utils/storage";
import { Messages } from "../utils/messages";
import "./contentScript.css";

const App: React.FC<{}> = () => {
  const [options, setOptions] = useState<LocalStrorageOptions | null>(null);
  const [isActive, setIsActive] = useState<boolean>(false);

  useEffect(() => {
    getStoredOptions().then((options) => {
      setOptions(options);
      setIsActive(options.hasOverlay);
    });
  }, []);

  const handleMessages = (msg: Messages) => {
    if (msg === Messages.TOGGLE_OVERLAY) {
      setIsActive(!isActive);
    }
  };

  useEffect(() => {
    chrome.runtime.onMessage.addListener(handleMessages);
    return () => {
      // clean up event listener, bug fix from: https://www.udemy.com/course/chrome-extension/learn/#questions/14694484/
      chrome.runtime.onMessage.removeListener(handleMessages);
    };
  }, [isActive]);

  if (!options) {
    return null;
  }

  return (
    <>
      {isActive && (
        <Card className="overlayCard">
          <WeatherCard
            city={options.homeCity}
            tempScale={options.tempScale}
            onDelete={() => setIsActive(false)}
          />
        </Card>
      )}
    </>
  );
};

const root = document.createElement("div");
document.body.appendChild(root);
ReactDOM.render(<App />, root);
