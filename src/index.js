const express = require("express");
//const morgan = require("morgan");
const app = express();
const port = 3000;
const path = require("path");
const handlebars = require("express-handlebars");
const db = require('./config/db');
const methodOverride = require('method-override')
const route = require('./routes')
const sortMiddleware = require('./app/middleware/sortMiddleware')


// Connecting database
db.connect();

app.use(express.static(path.join(__dirname + "/public")));
app.use(
    express.urlencoded({
        extended: true,
    })
);


app.use(express.json());
app.use(methodOverride('_method'))

// Custom middleware
app.use(sortMiddleware)
    // app.use(morgan('combined'))

// Template engine
app.engine(
    "hbs",
    handlebars({
        extname: ".hbs",
        helpers: require('./helpers/handlebars')
    })
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resources", "views"));

console.log(__dirname);

// Route init
route(app);


app.listen(port, () => {
    console.log(`
                        Example app listening at http: //localhost:${port}`);
});