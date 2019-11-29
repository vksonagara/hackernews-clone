import express from "express";
import db from "./db";
import apiRoutes from "./routes";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

const app = express();
const port = 3001;

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/api", apiRoutes);

app.listen(port, () => console.log(`Listening on port ${port}`));
