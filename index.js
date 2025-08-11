import express from "express";
const app = express();
const port = 5000;
// now we will be discussing about the middleware
app.use("/about", (req, res, next) => {
  const { q } = req.query;
  if (Number.isNaN(Number(q))) {
    return res.status(400).json({ message: "enter valid number" });
  }
  req.valid_number = Number(q);
  next();
});
app.get("/", (req, res) => {
  return res.status(200).json({ message: "this is local" });
});
app.get("/about", (req, res) => {
  // i will be destructuring the query params
  // const { q } = req.query;
  return res.status(200).json({ message: req.valid_number ** 2 });
});
app.listen(port, () => {
  console.log(`server is running `);
});
