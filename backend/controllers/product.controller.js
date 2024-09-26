const getProducts = (Model) => async (req, res) => {
 try {
  const products = await Model.find({});
  res.status(200).json(products);
 } catch (error) {
  res.status(500).json({ message: error.message });
 }
};

const getProductById = (Model) => async (req, res) => {
 try {
  const { id } = req.params;
  const products = await Model.findById(id);
  res.status(200).json(products);
 } catch (error) {
  res.status(500).json({ message: error.message });
 }
};

const createProduct = (Model) => async (req, res) => {
 try {
  const product = await Model.create(req.body);
  res.status(200).json(product);
 } catch (error) {
  res.status(500).json({ message: error.message });
 }
};

const updateProduct = (Model) => async (req, res) => {
 try {
  const { id } = req.params;
  const product = await Model.findByIdAndUpdate(id, req.body);
  if (!product) res.status(404).json({ message: "Model not found" });
  const updatedProduct = await Model.findById(id);
  res.status(200).json(updatedProduct);
 } catch (error) {
  res.status(500).json({ message: error.message });
 }
};

const deleteProduct = (Model) => async (req, res) => {
 try {
  const { id } = req.params;
  const product = await Model.findByIdAndDelete(id);
  if (!product) res.status(404).json({ message: "Model not found" });
  res.status(200).json({ message: "Success deleted" });
 } catch (error) {
  res.status(500).json({ message: error.message });
 }
};

module.exports = {
 getProducts,
 getProductById,
 createProduct,
 updateProduct,
 deleteProduct,
};
