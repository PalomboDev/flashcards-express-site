const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const app = express();
const port = 3000;

app.use(
    bodyParser.urlencoded({extended: false}),
    cookieParser()
);

app.use("/static", express.static("public"));

app.set("view engine", "pug");

const mainRoutes = require("./routes/main_routes");
const cardRoutes = require("./routes/card_routes");

app.use(mainRoutes);
app.use("/cards", cardRoutes);

app.use((req, res, next) => {
    const err = new Error("Not Found");
    
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    res.locals.error = err;
    res.status(err.status);
    res.render("error", err);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));