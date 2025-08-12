import Product from "../models/Product.js";

export const getProducts = async (req, res) => {};

export const getProduct = (req, res) => {};

export const createProduct = async (req, res) => {
  try {
    await Product.create(req.body);
    res.status(201).json({ message: "product created successfully" });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

export const updateProduct = (req, res) => {};

export const removeProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({
      message: "Product deleted successfully",
      product: deletedProduct,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error deleting product", error: err.message });
  }
};
