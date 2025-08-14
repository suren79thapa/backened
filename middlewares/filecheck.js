import path from "path";
import { v4 as uuidv4 } from "uuid";
const supportesTypes = [".png", ".jpg", ".jpeg", ".webp", ".gif"];

export const checkFile = (req, res, next) => {
  const file = req.files?.image;
  console.log(file);
  if (file) {
    // also need to validate the given image path is actually image
    const extName = path.extname(file.name);
    if (!supportesTypes.includes(extName))
      return res.status(400).json({ message: "please provide valid image" });
    const imagePath = `${uuidv4()}-${file.name}`;
    file.mv(`./uploads/${imagePath}`, (err) => {
      req.imagePath = imagePath;
      return next();
    });
  } else {
    return res.status(400).json({ message: "please provide valid image" });
  }
};

export const updateFile = (req, res, next) => {
  const file = req.files?.image;
  // console.log(file);
  if (file) {
    // also need to validate the given image path is actually image
    const extName = path.extname(file.name);
    if (!supportesTypes.includes(extName))
      return res.status(400).json({ message: "please provide valid image" });
    const imagePath = `${uuidv4()}-${file.name}`;
    file.mv(`./uploads/${imagePath}`, (err) => {
      req.imagePath = imagePath;
      return next();
    });
  } else {
    return next();
  }
};
