export const methodNotAllowed = (req, res) => {
  res.status(405).json({ message: "method not allowed" });
};
