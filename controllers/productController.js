export const products = [
  { id: 1, name: "samsung", price: 2000 },
  { id: 2, name: "iphone", price: 4000 },
  { id: 3, name: "nokia", price: 5000 },
];
export const getProducts = (req, res) => {
  return res.status(200).json({ products: products });
};
export const AddProduct = (req, res) => {
  const { product } = req.body;
  products.push(product);
  return res.status(200).json({ message: "product added" });
};
export const findProduct = (req, res) => {
  const { id } = req.params;
  if (Number.isNaN(Number(id))) {
    return res.status(400).json({ message: "please send valid id" });
  }
  const product = products.find((a) => a.id === Number(id));
  res.status(200).json({ product: product });
};
