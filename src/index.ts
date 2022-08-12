import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import mainRouter from "./router";

dotenv.config();
const app = express();
const port = 8000;

if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

app.use(mainRouter);

app.listen(port, () => {
    console.log(`app started listening at ${port}`);
});

export default app;
