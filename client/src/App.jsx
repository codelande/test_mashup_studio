import { useEffect, useState } from "react";
import "./assets/css/weather-icons.min.css";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

function App() {
  const [weather, setWeather] = useState({});

  useEffect(() => {
    fetch("http://localhost:3000/api/daily")
      .then((res) => res.json())
      .then((data) => setWeather(data));
    console.log(weather);
  }, []);

  if (weather.time) {
    return (
      <Grid container spacing={2} m='80px'>
        <Card sx={{ minWidth: 275 }}>
          <CardContent sx={{ display: "flex", flexDirection: "column"}}>
            <Typography
              sx={{ fontSize: 28 }}
              color="text.secondary"
              gutterBottom
              fontWeight={"bold"}
            >
              <CalendarMonthIcon fontSize="large" /> {weather.time[0]}
            </Typography>
            <Typography pt={'20px'} variant="h5" component="div" fontSize={"8rem"} alignSelf={'center'}>
              <i className={`wi wi-wmo4680-${weather.weathercode[0]}`}></i>
            </Typography>
            <Typography pt={'50px'} sx={{ mb: 1.5 }} color="blue" alignSelf={'center'}>
              Minimal temperature: {weather.temperature_2m_min[0]}°C
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="orange" alignSelf={'center'}>
              Maximal temperature: {weather.temperature_2m_max[0]}°C
            </Typography>
          </CardContent>
        </Card>
        <Box flex={"column"} ml={"8px"}>
          {weather.time.map(
            (day, index) =>
              index > 1 &&
              index <= 4 && (
                <Box key={index} my={"8px"}>
                  <Card>
                    <CardContent sx={{ display: "flex", flexDirection: "row" }}>
                      <Box>
                        <Typography
                          sx={{ fontSize: 14 }}
                          color="text.secondary"
                          gutterBottom
                          fontWeight={"bold"}
                        >
                          <CalendarMonthIcon /> {weather.time[index]}
                        </Typography>
                        <Typography pt={"8px"} color="blue">
                          {weather.temperature_2m_min[index]}°C
                          <Typography color="orange">
                            {weather.temperature_2m_max[index]}°C
                          </Typography>
                        </Typography>
                      </Box>
                      <Typography
                        variant="h5"
                        component="div"
                        alignSelf={"center"}
                        pl={"25px"}
                        fontSize={"3rem"}
                      >
                        <i
                          className={`wi wi-wmo4680-${weather.weathercode[index]}`}
                        ></i>
                      </Typography>
                    </CardContent>
                  </Card>
                </Box>
              )
          )}
        </Box>
      </Grid>
    );
  }
}

export default App;
