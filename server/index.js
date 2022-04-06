const express = require("express");
const morgan = require('morgan')
const cors = require('cors')
const app = express();
const db = require("./models");
const figlet = require("figlet");
const gradient = require("gradient-string");
app.use(express.json());

app.use(cors({
	origin: process.env.CLIENT_URL
}))
// Morgan give information about each requrest
app.use(morgan('dev'))

// Routers
const productsRoute = require("./routes/products.route");
app.use("/product", productsRoute);

app.use((req,res, next)=>{
	res.status(404).json({
		success: false,
		message: "Page Not Founded"
	})
})


const PORT = 5000
db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
	runningServe(`SERVE RUNNING ON PORT ${PORT}`);
  });
});

const runningServe = async (log) => {
	console.log(`\n--- ${log} ---`);
  const msg = `PRODUCT APP`
  figlet(msg, (err, data)=>[
	  console.log(gradient.pastel.multiline(data))
  ])
};

