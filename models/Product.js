import mongoose from "mongoose";
const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      unique: true,
      minLength: [5, "Title must be at least 10 characters long"],
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      enum: [
        "Apple",
        "Samsung",
        "Sony",
        "Xiaomi",
        "Dell",
        "HP",
        "Nike",
        "Adidas",
        "Puma",
        "Levi's",
      ],
      required: true,
    },
    category: {
      type: String,
      enum: [
        "Mobile",
        "Laptop",
        "Tablet",
        "Accessory",
        "Shoes",
        "Clothing",
        "Electronics",
        "Home Appliances",
      ],
      required: true,
    },
    stock: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    rating: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);
const Product = mongoose.model("Product", productSchema);
export default Product;
