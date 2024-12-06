import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import {
  Card,
  CardContent,
  Typography,
  Paper,
  TextField,
  Box,
  Button,
  Switch,
} from "@mui/material";
import "@fontsource/roboto";
import {
  getStoredOptions,
  setStoredOptions,
  LocalStrorageOptions,
} from "../utils/storage";
import Grid from "@mui/material/Grid2";
import { styled } from "@mui/material/styles";

import "./options.css";
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  ...theme.applyStyles("dark", {
    backgroundColor: "#1A2027",
    borderColor: "#fff",
  }),
}));

type FormState = "ready" | "saving";

const App: React.FC<{}> = () => {
  const [options, setOptions] = useState<LocalStrorageOptions | null>(null);
  const [formState, setFormState] = useState<FormState>("ready");
  useEffect(() => {
    getStoredOptions().then((options) => {
      setOptions(options);
    });
  }, []);

  const handleHomeCityChange = (homeCity: string) => {
    setOptions({
      ...options,
      homeCity,
    });
  };

  const handleSaveButtonClick = () => {
    setFormState("saving");
    setStoredOptions(options).then(() => {
      setFormState("ready");
    });
  };

  const handleAutoOverlayChange = (hasOverlay: boolean) => {
    setStoredOptions(options);
    setOptions({
      ...options,
      hasOverlay,
    });
  };
  const isFieldDisabled = formState === "saving";

  if (!options) {
    return null;
  }
  return (
    <Box mx={"10%"} my={"2%"}>
      <Card>
        <CardContent>
          <Grid container spacing={2} direction={"column"}>
            <Item>
              <Typography variant="h5">Weather Extension Options</Typography>
            </Item>
            <div>
              <Typography sx={{ paddingBottom: "10px" }} variant="h6">
                Home City
              </Typography>
              <TextField
                fullWidth
                placeholder="Enter your home city"
                value={options.homeCity}
                onChange={(e) => {
                  handleHomeCityChange(e.target.value);
                }}
                disabled={isFieldDisabled}
              ></TextField>
            </div>
            <div>
              <Typography sx={{ paddingBottom: "10px" }} variant="body1">
                Auto toggle overplay on Webpage load
              </Typography>
              <Switch
                color="primary"
                checked={options.hasOverlay}
                onChange={(event, checked) => {
                  handleAutoOverlayChange(checked);
                }}
                disabled={isFieldDisabled}
              ></Switch>
            </div>
            <div>
              <Button
                variant="contained"
                onClick={handleSaveButtonClick}
                color="primary"
                disabled={isFieldDisabled}
              >
                {formState === "ready" ? "Save" : "Saving..."}
              </Button>
            </div>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

const root = document.createElement("div");
document.body.appendChild(root);
ReactDOM.render(<App />, root);
