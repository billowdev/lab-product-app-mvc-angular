const path = require('path');
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const figlet = require("figlet");
const gradient = require("gradient-string");
const bodyParser = require("body-parser");
const db = require("./models");
const app = express();
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

app.use(
  cors({
    origin: "http://localhost:4200",
  })
);

// Morgan give information about each requrest
app.use(morgan("dev"));


// static path
app.use(express.static(path.join(__dirname, 'dist/')))
app.get('/', (req, res)=>{
	res.sendFile(path.json(__dirname, 'dist/index.html'))
})

// Routers
const productsRoute = require("./routes/products.route");
app.use("/api/product", productsRoute);

app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: "Page Not Founded",
  });
});

const PORT = process.env.PORT || 5000;
db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    runningServe(`SERVE RUNNING ON PORT ${PORT}`);
  });
});

const runningServe = async (log) => {
  console.log(`\n--- ${log} ---`);
  const msg = `PRODUCT APP`;
  figlet(msg, (err, data) => [console.log(gradient.pastel.multiline(data))]);
};
