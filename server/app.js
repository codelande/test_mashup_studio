const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;
app.use(cors());

app.get("/api/daily", async (req, res) => {
  async function getData() {
    const response = await fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=47.90&longitude=1.90&daily=weathercode,temperature_2m_max,temperature_2m_min&current_weather=true&timezone=Europe%2FBerlin"
    );

    return response.json();
  }
  const meteoData = await getData();
  const dailyData = meteoData.daily;
  res.send(dailyData);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
