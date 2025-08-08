import express from "express";
const app = express();
console.log(app);
const port = 5000;

app.get("/", (req, res) => {
  const { m } = req.query;
  if (m === undefined || isNaN(Number(m))) {
    return res.status(400).json({
      message: "please send a valid number",
    });
  }

  res.status(200).json({ message: `the value ${m} is a proper number` });
});
app.get("/about", (req, res) => {
  return res.status(200).json({ message: "about" });
});

app.listen(port, () => {
  console.log("server is running");
});
