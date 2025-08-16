import Joi from "joi";
import joiValidate from "express-joi-validation";
// now i need to export the validator as well where i can apply these schema validation on the body
export const validatorJoi = joiValidate.createValidator({});
export const productupdateSchema = Joi.object({
  title: Joi.string().min(5),
  description: Joi.string(),
  brand: Joi.string().valid(
    "Apple",
    "Samsung",
    "Sony",
    "Xiaomi",
    "Dell",
    "HP",
    "Nike",
    "Adidas",
    "Puma",
    "Levi's"
  ),
  category: Joi.string().valid(
    "Mobile",
    "Laptop",
    "Tablet",
    "Accessory",
    "Shoes",
    "Clothing",
    "Electronics",
    "Home Appliances"
  ),
  stock: Joi.number(),
  price: Joi.number(),
});

export const productSchema = Joi.object({
  title: Joi.string().min(5).required(),
  description: Joi.string().required(),
  brand: Joi.string()
    .valid(
      "Apple",
      "Samsung",
      "Sony",
      "Xiaomi",
      "Dell",
      "HP",
      "Nike",
      "Adidas",
      "Puma",
      "Levi's"
    )
    .required(),
  category: Joi.string()
    .valid(
      "Mobile",
      "Laptop",
      "Tablet",
      "Accessory",
      "Shoes",
      "Clothing",
      "Electronics",
      "Home Appliances"
    )
    .required(),
  stock: Joi.number().required(),
  price: Joi.number().required(),
});
