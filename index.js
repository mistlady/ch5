const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const port = process.env.PORT || 5000;

const app = express();

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const db = fs.readFileSync(path.resolve(__dirname, "db.json"));
const data = JSON.parse(db);

app.get("/api", (req, res) => {
  return res.status(200).json({ data: "hello world" });
});

app.get("/api/UserUrl", (req, res) => {
  return res.status(200).json({ data: data.UserUrl });
});

app.post("/api/UserUrl", async (req, res) => {
  const id = Math.floor(Math.random() * 100000);
  const { url, shorturl } = req.body;

  data.UserUrl.push({ id, url, shorturl });
  await fs.writeFileSync(
    path.resolve(__dirname, "db.json"),
    JSON.stringify(data)
  );

  return res.status(200).json({ data: data.UserUrl });
});

app.listen(port, () => {
  console.log(`Server run on port ${port}`);
});
