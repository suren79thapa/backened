import Order from "../models/Order.js";
import Product from "../models/Product.js";

export const getOrders = async (req, res) => {
  try {
    if (req.role === "Admin") {
      const orders = await Order.find();
      return res.status(200).json(orders);
    } else {
      const orders = await Order.find({ user: req.userId });
      return res.status(200).json(orders);
    }
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};
export const getOrder = async (req, res) => {
  // route ma aayeko dynamic id lai req.params le catch garne
  const { id } = req.params;
  try {
    const order = await Order.findById(id);
    return res.status(200).json(order);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};
export const createOrder = async (req, res) => {
  const { products, totalAmount } = req.body;
  try {
    console.log(products);
    products.forEach(async (product) => {
      await Product.findById(product.id);
      await Product.updateOne(
        { _id: product.id },
        { $inc: { stock: -product.qty } }
      );
    });
    await Order.create({
      user: req.userId,
      products,
      totalAmount,
    });
    return res.status(201).json({ message: "Order created successfully" });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};
