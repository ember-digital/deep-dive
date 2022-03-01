const express = require("express");
const data = require("./data");
const app = express();

app.use((_, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

app.use((_, __, next) => setTimeout(next, randomIntFromInterval(0, 15000)));

function randomFailuresMiddleware(_, res, next) {
  if (Math.random() > 0.5) {
    res.setHeader("Content-Type", "text/plain");
    res.writeHead(500, res.headers);
    return res.end("Internal Error");
  }
  next();
}

app.use(randomFailuresMiddleware);

function potentialDataFailure(data) {
  if (Math.random() > 0.7) {
    return data.map((item) => {
      if (Math.random() > 0.6) {
        delete item.actualClassification;
      }
      return item;
    });
  }
  return data;
}

app.get("/api/transactions", (_, res) => {
  res.status(200).send(potentialDataFailure(data));
});

const PORT = 4000;

app.listen(PORT, () => {
  console.log("HTTP Server running at http://localhost:" + PORT);
});
