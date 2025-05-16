const Category = require("../models/category");

exports.addCategory = async (req, res) => {
  try {
    const { name, slug, parent, icon } = req.body;
    const newCategory = await Category.create({ name, slug, parent, icon });
    res.status(201).json({ 
      message: "Category created successfully",
      category: newCategory 
    });
  } catch (error) {
    res.status(500).json({ 
      message: "Error creating category",
      error: error.message 
    });
  }
};

exports.getCategory = async (req, res) => {
  try {
    const categories = await Category.find({});
    if (categories.length === 0) {
      return res.status(404).json({ message: "No categories found" });
    }
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ 
      message: "Server error", 
      error: error.message 
    });
  }
};

exports.removeCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCategory = await Category.findByIdAndDelete(id);
    if (!deletedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.status(200).json({ 
      message: "Category deleted successfully",
      category: deletedCategory 
    });
  } catch (error) {
    res.status(500).json({ 
      message: "Server error", 
      error: error.message 
    });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, slug, parent, icon } = req.body;
    const updatedCategory = await Category.findByIdAndUpdate(
      id, 
      { name, slug, parent, icon },
      { new: true }
    );
    if (!updatedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.status(200).json({
      message: "Category updated successfully",
      category: updatedCategory
    });
  } catch (error) {
    res.status(500).json({ 
      message: "Server error", 
      error: error.message 
    });
  }
};