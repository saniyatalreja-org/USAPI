const db = require("../config/db");

// CREATE LISTING
const createListing = async (req, res) => {
    try {

        const {
            user_id,
            category_id,
            title,
            description,
            price,
            listing_type,
            item_condition,
            location
        } = req.body;

        const result = await db.query(
            `INSERT INTO listings
            (user_id, category_id, title, description, price, listing_type, item_condition, location)
            VALUES($1,$2,$3,$4,$5,$6,$7,$8)
            RETURNING *`,
            [
                user_id,
                category_id,
                title,
                description,
                price,
                listing_type,
                item_condition,
                location
            ]
        );

        res.status(201).json(result.rows[0]);

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
};

// GET ALL LISTINGS
const getListings = async (req, res) => {

    try {

        const result = await db.query(
            "SELECT * FROM listings ORDER BY listing_id"
        );

        res.json(result.rows);

    } catch (err) {

        console.log(err);
        res.status(500).json({ message: err.message });

    }

};

// GET SINGLE LISTING
const getListingById = async (req, res) => {

    try {

        const { id } = req.params;

        const result = await db.query(
            "SELECT * FROM listings WHERE listing_id=$1",
            [id]
        );

        res.json(result.rows[0]);

    } catch (err) {

        console.log(err);
        res.status(500).json({ message: err.message });

    }

};

// UPDATE LISTING
const updateListing = async (req, res) => {

    try {

        const { id } = req.params;

        const {
            category_id,
            title,
            description,
            price,
            listing_type,
            item_condition,
            location,
            status
        } = req.body;

        const result = await db.query(
            `UPDATE listings
            SET
            category_id=$1,
            title=$2,
            description=$3,
            price=$4,
            listing_type=$5,
            item_condition=$6,
            location=$7,
            status=$8
            WHERE listing_id=$9
            RETURNING *`,
            [
                category_id,
                title,
                description,
                price,
                listing_type,
                item_condition,
                location,
                status,
                id
            ]
        );

        res.json(result.rows[0]);

    } catch (err) {

        console.log(err);
        res.status(500).json({ message: err.message });

    }

};

// DELETE LISTING
const deleteListing = async (req, res) => {

    try {

        const { id } = req.params;

        await db.query(
            "DELETE FROM listings WHERE listing_id=$1",
            [id]
        );

        res.json({
            message: "Listing Deleted Successfully"
        });

    } catch (err) {

        console.log(err);
        res.status(500).json({ message: err.message });

    }

};

module.exports = {
    createListing,
    getListings,
    getListingById,
    updateListing,
    deleteListing
};