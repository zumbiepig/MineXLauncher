import createError from "http-errors";
import express, { json, urlencoded, static as serveStatic } from "express";
import { join } from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import debug from "debug";
import { createServer } from "http";
import indexRouter from "./routes/index.js";
import usersRouter from "./routes/users.js";

const __dirname = import.meta.dirname;

const app = express();

app.set("views", join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use(serveStatic(join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

app.use(function (req, res, next) {
	next(createError(404));
});

app.use(function (err, req, res, next) {
	res.locals.message = err.message;
	res.locals.error = req.app.get("env") === "development" ? err : {};

	res.status(err.status || 500);
	res.render("error");
});

const debugLogger = debug("minexlauncher:server");

const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

const server = createServer(app);

server.listen(port);
server.on("error", onError);
server.on("listening", onListening);

function normalizePort(val) {
	const port = parseInt(val, 10);
	if (isNaN(port)) {
		return val;
	} else if (port >= 0) {
		return port;
	} else {
		return false;
	}
}

function onError(error) {
	if (error.syscall !== "listen") {
		throw error;
	}
	const bind = typeof port === "string" ? "Pipe " + port : "Port " + port;
	switch (error.code) {
		case "EACCES":
			console.error(bind + " requires elevated privileges");
			process.exit(1);
			break;
		case "EADDRINUSE":
			console.error(bind + " is already in use");
			process.exit(1);
			break;
		default:
			throw error;
	}
}

function onListening() {
	const addr = server.address();
	const bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
	debugLogger("Listening on " + bind);
}
