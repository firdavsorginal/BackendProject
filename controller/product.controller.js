const { Product, Venue } = require("../models");

exports.createProduct = async (req, res) => {
  try {
    const { name, price, venueId } = req.body;

    // Venue mavjudligini tekshiramiz
    const venue = await Venue.findByPk(venueId);
    if (!venue) {
      return res.status(404).json({ error: "Venue not found" });
    }

    // Product yaratamiz
    const product = await Product.create({ name, price, VenueId: venueId });

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.getProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { name, price } = req.body;
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    product.name = name;
    product.price = price;
    await product.save();

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    await product.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
