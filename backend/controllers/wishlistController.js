const db = require("../config/db");

// ================= ADD TO WISHLIST =================

const addToWishlist = async (req, res) => {

    try {

        const { user_id, listing_id } = req.body;

        const result = await db.query(

            `INSERT INTO wishlist (user_id, listing_id)
             VALUES ($1,$2)
             RETURNING *`,

            [user_id, listing_id]

        );

        res.status(201).json(result.rows[0]);

    } catch (err) {

        console.log(err);

        res.status(500).json({ message: err.message });

    }

};

// ================= GET WISHLIST =================

const getWishlist = async (req, res) => {

    try {

        const { user_id } = req.params;

        const result = await db.query(

            `SELECT
                w.wishlist_id,
                l.listing_id,
                l.title,
                l.description,
                l.price,
                l.item_condition,
                l.location
            FROM wishlist w
            JOIN listings l
            ON w.listing_id = l.listing_id
            WHERE w.user_id = $1
            ORDER BY w.wishlist_id`,

            [user_id]

        );

        res.json(result.rows);

    } catch (err) {

        console.log(err);

        res.status(500).json({ message: err.message });

    }

};

// ================= REMOVE =================

const removeFromWishlist = async (req, res) => {

    try {

        const { id } = req.params;

        await db.query(

            "DELETE FROM wishlist WHERE wishlist_id=$1",

            [id]

        );

        res.json({

            message: "Removed Successfully"

        });

    } catch (err) {

        console.log(err);

        res.status(500).json({ message: err.message });

    }

};

module.exports = {

    addToWishlist,
    getWishlist,
    removeFromWishlist

};