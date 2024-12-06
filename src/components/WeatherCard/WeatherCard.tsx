import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  CardActions,
  Typography,
  Paper,
  Button,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { styled } from "@mui/material/styles";

import {
  fetchWeatherData,
  getWeatherIconUrl,
  OpenWeatherData,
  OpenWeatherTempScale,
} from "../../utils/api";
import "./WeatherCard.css";

const WeatherCardContainer: React.FC<{
  children: React.ReactNode;
  tempScale?: OpenWeatherTempScale;
  onDelete?: () => void;
}> = ({ children, onDelete, tempScale }) => {
  return (
    <Box mx={"4px"} my={"16px"}>
      <Card>
        <CardContent>{children}</CardContent>
        <CardActions>
          {onDelete && (
            <Button
              className="weatherCard-body"
              onClick={onDelete}
              color="secondary"
            >
              Delete
            </Button>
          )}
        </CardActions>
      </Card>
    </Box>
  );
};

type WeatherCardState = "loading" | "error" | "ready";
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
const WeatherCard: React.FC<{
  city: string;
  tempScale: OpenWeatherTempScale;
  onDelete?: () => void;
}> = ({ city, onDelete, tempScale }) => {
  const [weatherData, setWeatherData] = useState<OpenWeatherData>();
  const [cardState, setCardState] = useState<WeatherCardState>("loading");
  useEffect(() => {
    fetchWeatherData(city, tempScale)
      .then((data) => {
        console.log(data);
        setWeatherData(data);
        setCardState("ready");
      })
      .catch((err) => {
        console.log(err);
        setCardState("error");
      });
  }, [city, tempScale]);

  if (cardState === "loading" || cardState === "error") {
    return (
      <WeatherCardContainer onDelete={onDelete} tempScale={tempScale}>
        <Typography className="weatherCard-title" variant={"h5"}>
          {city}
        </Typography>
        <Typography className="weatherCard-body" variant={"h5"}>
          {cardState === "loading" ? "Loading" : "Error could not fetch data"}
        </Typography>
      </WeatherCardContainer>
    );
  }
  return (
    <WeatherCardContainer onDelete={onDelete} tempScale={tempScale}>
      <Grid container justifyContent={"space-around"} direction={"row"}>
        <div>
          <Typography className="weatherCard-title" variant={"h5"}>
            {weatherData.name}
          </Typography>

          <Typography className="weatherCard-temp">
            {Math.round(weatherData.main.temp)}
          </Typography>
          <Typography className="weatherCard-body">
            Feels likes: {Math.round(weatherData.main.feels_like)}
          </Typography>
        </div>
        <div>
          {weatherData.weather.length > 0 && (
            <>
              <img src={getWeatherIconUrl(weatherData.weather[0].icon)} />
              <Typography className="weatherCard-body">
                {weatherData.weather[0].main}
              </Typography>
            </>
          )}
        </div>
      </Grid>
    </WeatherCardContainer>
  );
};

export default WeatherCard;
