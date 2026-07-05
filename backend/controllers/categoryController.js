const db = require("../config/db");

// CREATE CATEGORY
const createCategory = async (req, res) => {
    try {
        const { category_name, description } = req.body;

        const result = await db.query(
            `INSERT INTO categories (category_name, description)
             VALUES ($1, $2)
             RETURNING *`,
            [category_name, description]
        );

        res.status(201).json(result.rows[0]);

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
};

// GET ALL CATEGORIES
const getCategories = async (req, res) => {
    try {
        const result = await db.query(
            "SELECT * FROM categories ORDER BY category_id"
        );

        res.json(result.rows);

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
};

// UPDATE CATEGORY
const updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { category_name, description } = req.body;

        const result = await db.query(
            `UPDATE categories
             SET category_name=$1,
                 description=$2
             WHERE category_id=$3
             RETURNING *`,
            [category_name, description, id]
        );

        res.json(result.rows[0]);

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
};

// DELETE CATEGORY
const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;

        await db.query(
            "DELETE FROM categories WHERE category_id=$1",
            [id]
        );

        res.json({
            message: "Category Deleted Successfully"
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    createCategory,
    getCategories,
    updateCategory,
    deleteCategory
};