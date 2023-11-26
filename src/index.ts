import express, { Request, Response } from "express";
import path from "path";
import cors from "cors";
import fs from "fs/promises";

const app = express();
const PORT = 3000;

const defaultConfigPath = path.join(
  __dirname,
  "config",
  "default-response.config.json",
);

app.use(cors());
app.use(express.json());

const handleRequest = async (req: Request, res: Response) => {
  const { method, originalUrl } = req;
  const endpoint = originalUrl.split("?")[0];

  console.log(
    `📫 HTTPMethod: ${req.method} , RequestURL: ${
      req.path
    } , RequestBody: ${JSON.stringify(
      req.body,
    )} , RequestQuery: ${JSON.stringify(req.query)}`,
  );

  try {
    const filePath = path.join(
      __dirname,
      "response",
      endpoint,
      `${method}.json`,
    );

    let jsonData;

    try {
      const data = await fs.readFile(filePath, "utf-8");
      jsonData = JSON.parse(data);

      res.json(jsonData);
    } catch (error) {
      const defaultData = await fs.readFile(defaultConfigPath, "utf-8");
      const defaultConfig = JSON.parse(defaultData);

      const defaultStatus = defaultConfig[method.toLowerCase()]?.status || 500;

      jsonData = {
        status: defaultStatus,
      };
      res.status(jsonData.status).json(jsonData);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

app.get("/*", handleRequest);
app.post("/*", handleRequest);
app.put("/*", handleRequest);
app.patch("/*", handleRequest);
app.delete("/*", handleRequest);

app.listen(PORT, () => {
  console.log("================================================");
  console.log(`🚀 Server is running at http://localhost:${PORT}!🐢`);
  console.log("================================================");
});
