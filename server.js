const express = require("express");
const compression = require("compression");
const path = require("path");
const port = process.env.PORT || 3000;
const morgan = require("morgan");
const app = express();
const dev = app.get("env") !== "production";

if (!dev) {
  app.disable("x-powered-by");
  app.use(compression());
  app.use(morgan("common"));
  app.use(express.static(path.join(__dirname, "build")));

  app.get("/*", function (req, res) {
    res.sendFile(path.join(__dirname, "build", "index.html"));
  });
}
if (dev) {
  app.use(morgan("dev"));
}

app.listen(port, () => {
  console.log("express running on port 3000");
});
