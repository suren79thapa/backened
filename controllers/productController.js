import Product from "../models/Product.js";

export const getProducts = async (req, res) => {};

export const getProduct = (req, res) => {};

export const createProduct = async (req, res) => {
  try {
    await Product.create(req.body);
    return res.status(201).json({ message: "Product created successfully" });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

export const updateProduct = (req, res) => {};

export const removeProduct = (req, res) => {};
