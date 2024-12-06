import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import Grid from "@mui/material/Grid2";
import { InputBase, IconButton, Paper, Box } from "@mui/material";
import { Add as AddIcon, PictureInPicture } from "@mui/icons-material";
import "./popup.css";
import "@fontsource/roboto";
import { styled } from "@mui/material/styles";
import { Messages } from "../utils/messages";

import WeatherCard from "../components/WeatherCard/WeatherCard";
import {
  setStoredCities,
  getStoredCities,
  setStoredOptions,
  getStoredOptions,
  LocalStrorageOptions,
} from "../utils/storage";
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  ...theme.applyStyles("dark", {
    backgroundColor: "#1A2027",
  }),
}));

const App: React.FC<{}> = () => {
  const [cites, setCites] = useState<string[]>([
    "Mumbai",
    "Delhi",
    "Error",
    "Toronto",
  ]);

  const [cityInput, setCityInput] = useState<string>("");
  const [options, setOptions] = useState<LocalStrorageOptions | null>(null);
  console.log(cityInput);

  const handleCityAddButtonClick = () => {
    const updatedCities = [...cites, cityInput];
    setStoredCities(updatedCities).then(() => {
      setCites(updatedCities);
      setCityInput("");
    });
  };

  const handleCityDeleteButtonClick = (index: number) => {
    cites.splice(index, 1);
    const updatedCities = [...cites];
    setStoredCities(updatedCities).then(() => {
      setCites(updatedCities);
    });
  };

  const handleTempScaleButtonClick = () => {
    const updatedOptions: LocalStrorageOptions = {
      ...options,
      tempScale: options.tempScale === "metric" ? "imperial" : "metric",
    };
    setStoredOptions(updatedOptions).then(() => {
      setOptions(updatedOptions);
    });
  };

  const handleAutoOverlayChange = () => {
    chrome.tabs.query(
      {
        active: true,
      },
      (tabs) => {
        if (tabs.length > 0) {
          chrome.tabs.sendMessage(tabs[0].id, Messages.TOGGLE_OVERLAY);
        }
      }
    );
  };
  useEffect(() => {
    getStoredCities().then((cities) => {
      if (cities) {
        setCites(cities);
      }
    });
    getStoredOptions().then((options) => {
      if (options) {
        setOptions(options);
      }
    });
  }, []);

  if (!options) {
    return null;
  }

  return (
    <Box mx={"4px"} my={"16px"}>
      <Grid container justifyContent={"space-evenly"}>
        <Item>
          <Paper>
            <Box px="15px" py="5px">
              <InputBase
                placeholder="Add a New City"
                onChange={(e) => setCityInput(e.target.value)}
              />
              <IconButton onClick={handleCityAddButtonClick}>
                <AddIcon />
              </IconButton>
            </Box>
          </Paper>
        </Item>
        <Item>
          <Paper>
            <Box px="5px">
              <IconButton onClick={handleTempScaleButtonClick}>
                {options.tempScale === "metric" ? "\u2103" : "\u2109"}
              </IconButton>
            </Box>
          </Paper>
        </Item>
        <Item>
          <Paper>
            <Box px="5px">
              <IconButton onClick={handleAutoOverlayChange}>
                <PictureInPicture />
              </IconButton>
            </Box>
          </Paper>
        </Item>
      </Grid>
      {options.homeCity !== "" && (
        <WeatherCard city={options.homeCity} tempScale={options.tempScale} />
      )}
      {cites.map((city, index) => {
        return (
          <WeatherCard
            city={city}
            key={index}
            tempScale={options.tempScale}
            onDelete={() => handleCityDeleteButtonClick(index)}
          />
        );
      })}
    </Box>
  );
};

const root = document.createElement("div");
document.body.appendChild(root);
ReactDOM.render(<App />, root);
