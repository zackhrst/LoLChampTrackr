const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOptions = {
    origin: "http://localhost:8081"
};

app.use(cors());

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./models");
db.sequelize.sync();
// db.sequelize.sync({ force: true }).then(()=> {
//     console.log("Drop and re-sync db.");
// });

app.get("/", (req, res) => {
    res.json({ message: "Welcome to Z's application." });
});

require("./routes/champion.routes")(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});