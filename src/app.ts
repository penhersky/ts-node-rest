import bodyParser from "body-parser";
import morgan from "morgan";
import express from "express";

const app: express.Application = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(morgan("dev"));

const a = 10;

app.get("/", (req: express.Request, res: express.Response) => {
  res.status(200).json({
    ok: "start"
  });
});

export default app;
