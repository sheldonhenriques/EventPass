const express = require("express");

const app = express();
const port = 3000;

app.set("view engine", "ejs");

app.use(express.static("./public"));

app.use(express.json()); // to support JSON-encoded bodies
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendStatus(200);
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log({
    level: "info",
    message: `Express is listening at http://localhost:${port}`,
  });
});