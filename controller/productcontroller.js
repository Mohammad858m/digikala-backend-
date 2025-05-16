const Product = require("../models/product");
const {createProductSchema} = require("../validations/productvalidator");


exports.getProducts = async (req, res) => {
  try {
    const {
      title,
      minPrice,
      maxPrice,

      category,
      brand,
      tags,
      inStock,
      page = 1,
      limit = 10,
    } = req.query;

    const filter = {};

    if (title) filter.title = { $regex: title, $options: "i" };
    if (brand) filter.brand = brand;
    if (category) filter.category = category;
    if (inStock !== undefined) filter.inStock = inStock === "true";

    if (tags) {
      const tagArray = Array.isArray(tags) ? tags : tags.split(",");
      filter.tags = { $in: tagArray };
    }

    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const [products, total] = await Promise.all([
      Product.find(filter)
        .populate("category")
        .skip(skip)
        .limit(parseInt(limit)),
      Product.countDocuments(filter),
    ]);

    res.status(200).json({
      products,
      total,
      currentPage: parseInt(page),
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};


exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.slug).populate("category");
    if (!product) return res.status(404).json({ message: "Product not found" });

    res.status(200).json({ product });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const { error } = createProductSchema.validate(req.body);
    if (error)
      return res.status(400).json({ message: error.details[0].message });
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(201).json({ message: "Product created", product: newProduct });
  } catch (error) {
    res.status(500).json({ message: "Creation failed", error: error.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { error } = validateProduct.validate(req.body);
    if (error)
      return res.status(400).json({ message: error.details[0].message });
    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: "Product not found" });

    res.status(200).json({ message: "Product updated", product: updated });
  } catch (error) {
    res.status(500).json({ message: "Update failed", error: error.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Product not found" });

    res.status(200).json({ message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ message: "Delete failed", error: error.message });
  }
};
