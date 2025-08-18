import Product, { brands, categories } from "../models/Product.js";
import mongoose from "mongoose";
import fs from "fs";
import { removeFile } from "../utils/fileRemove.js";

export const getTop5products = (req, res, next) => {
  req.top5 = true;
  next();
};

export const getProducts = async (req, res) => {
  try {
    const queryObject = { ...req.query };
    const excludedFields = [
      "sort",
      "fields",
      "search",
      "page",
      "limit",
      "skip",
    ];
    excludedFields.forEach((field) => {
      delete queryObject[field];
    });

    if (req.query.search) {
      const searchText = req.query.search;

      if (
        categories.some(
          (name) => name.toLowerCase() === searchText.toLowerCase()
        )
      ) {
        queryObject.category = { $regex: searchText, $options: "i" };
      } else if (
        brands.some((name) => name.toLowerCase() === searchText.toLowerCase())
      ) {
        queryObject.brand = { $regex: searchText, $options: "i" };
      } else {
        queryObject.title = { $regex: searchText, $options: "i" };
      }
    }

    const output = Object.entries(queryObject).reduce((acc, [key, value]) => {
      const match = key.match(/(.+)\[(.+)\]/); // fixed regex
      if (match) {
        const field = match[1];
        const operator = `$${match[2]}`;
        const parsedValue = isNaN(value) ? value : Number(value);

        if (!acc[field]) {
          acc[field] = {};
        }
        acc[field][operator] = parsedValue;
      } else {
        acc[key] = value;
      }
      return acc;
    }, {});

    const query = Product.find(req.top5 ? { rating: { $gt: 4 } } : output);

    if (req.query.sort) {
      const sorting = req.query.sort
        .split(/[\s,]+/)
        .filter(Boolean)
        .join(" ");
      query.sort(sorting);
    }

    if (req.query.fields) {
      const fields = req.query.fields
        .split(/[\s,]+/)
        .filter(Boolean)
        .join(" ");
      query.select(fields);
    }
    const page = req.query.page || 1;
    const limit = req.top5 ? 5 : req.query.limit || 10;
    const skip = (page - 1) * 10;

    const total = await Product.countDocuments();
    const products = await query.skip(skip).limit(limit);
    return res.status(200).json({
      products,
      total: total,
      totalPages: Math.ceil(total / limit),
    });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

export const getProduct = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.isValidObjectId(id))
      return res.status(400).json({ message: "please provide valid id" });
    const isExist = await Product.findById(id);
    if (!isExist) res.status(404).json({ message: "Product not found" });
    return res.status(200).json(isExist);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

export const createProduct = async (req, res) => {
  try {
    await Product.create({
      ...req.body,
      image: req.imagePath,
    });
    return res.status(201).json({ message: "Product created successfully" });
  } catch (err) {
    fs.unlink(`./uploads/${req.imagePath}`, (error) => {
      return res.status(400).json({ message: err.message });
    });
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.isValidObjectId(id)) {
      if (req.imagePath) removeFile(req.imagePath);
      return res.status(400).json({ message: "please provide valid id" });
    }
    const isExist = await Product.findById(id);

    if (!isExist) {
      if (req.imagePath) removeFile(req.imagePath);
      return res.status(404).json({ message: "Product not found" });
    }

    isExist.title = req.body?.title || isExist.title;
    isExist.description = req.body?.description || isExist.description;
    isExist.brand = req.body?.brand || isExist.brand;
    isExist.price = req.body?.price || isExist.price;
    isExist.category = req.body?.category || isExist.category;
    if (req.imagePath) removeFile(isExist.image);
    isExist.image = req.imagePath || isExist.image;

    await isExist.save();
    return res.status(200).json({ message: "product updated successfully" });
  } catch (err) {
    if (req.imagePath) removeFile(req.imagePath);
    return res.status(400).json({ message: err.message });
  }
};

export const removeProduct = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.isValidObjectId(id))
      return res.status(400).json({ message: "please provide valid id" });
    const isExist = await Product.findById(id);

    if (!isExist) res.status(404).json({ message: "Product not found" });

    fs.unlink(`./uploads/${isExist.image}`, async (error) => {
      await isExist.deleteOne();
      return res.status(200).json({ message: "Product deleted successfully" });
    });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};
