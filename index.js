import express from "express";
const app = express();
const port = 5000;
const products = [
  { id: 1, name: "ram", age: 90 },
  { id: 2, name: "sita", age: 70 },
  { id: 3, name: "gita", age: 60 },
];
// now we will be discussing about the middleware
// app.use("/about", (req, res, next) => {
//   const { q } = req.query;
//   if (Number.isNaN(Number(q))) {
//     return res.status(400).json({ message: "enter valid number" });
//   }
//   req.valid_number = Number(q);
//   next();
// });
app.use(express.json());
function validateID(req, res, next) {
  const { id } = req.params;
  if (Number.isNaN(Number(id))) {
    return res.status(404).json({ message: "send valid number" });
  }
  next();
}
app.get("/", (req, res) => {
  return res.status(200).json({ message: "this is local" });
});
// app.get("/about", (req, res) => {
//   // i will be destructuring the query params
//   // const { q } = req.query;
//   return res.status(200).json({ message: req.valid_number ** 2 });
// });
app.post("/", (req, res) => {
  const { numbers } = req.body;
  const sum = numbers.reduce((acc, curr) => acc + curr);
  return res.status(200).json({ message: `sum of array is ${sum}` });
});
app.get("/products/:id", validateID, (req, res) => {
  const { id } = req.params;
  const product = products.find((a) => a.id === Number(id));
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }
  res.status(200).json({ product: product.name });
});

app.listen(port, () => {
  console.log(`server is running `);
});
