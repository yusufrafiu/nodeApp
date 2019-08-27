const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

// connect to the mongodb database using mongoose
const mongoose = require("mongoose");
mongoose.connect(
	"mongodb+srv://yusuf:STUnDredsTreAsTicaBL@nodeapp-gucqp.mongodb.net/test?retryWrites=true&w=majority",
	{ useNewUrlParser: true }
);

// if there's problem with db connection,
// log error to the console
mongoose.connection.on("error", err => {
	console.error(err.message);
});

// import all routers
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// setup your static files
app.use(express.static(path.join(__dirname, "public")));

app.use(logger("dev"));

// parse incoming requests
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/", indexRouter);
app.use("/users", usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get("env") === "development" ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render("error");
});

module.exports = app;
