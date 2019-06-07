const express = require("express");
require("express-async-errors");
const app = express();
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const mongoose = require("mongoose");
const config = require("config");

process.on('uncaughtException', (ex) => {
  console.error(ex);
  process.exit(1);
});

process.on('unhandledRejection', (ex) => {
  console.error(ex);
  process.exit(1);
});

app.use(cors());
require('./middlewares/rateLimit')(app, '/api', 60, 50); // 요청 횟수 제한: 1분에 50번
app.use(express.json());

require("./middlewares/routes")(app);
require("./middlewares/error")(app);

app.use(helmet());
app.use(compression());

console.log(config.get('jwtKey'))
if(!config.get('jwtKey')) {
  console.log('jwtKey must be defined');
  exit(1);
}

// database 연결
const dbUrl =
  process.env.NODE_ENV === "production"
    ? config.get("database.url")
    : "mongodb://localhost/bike";

mongoose
  .connect(dbUrl, {
    useNewUrlParser: true,
    useFindAndModify: false
  })
  .then(() => console.log("🔥 Connected to mongodb!",`[${dbUrl}]`))
  .catch(err => console.log(`☠️ Failed to connect to mongodb: [${dbUrl}]`, err.message));

// 리스닝 시작
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`🔥 Start listening on port ${port}`);
});
