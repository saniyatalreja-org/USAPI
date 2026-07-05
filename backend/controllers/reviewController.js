
const db = require("../config/db");

// CREATE REVIEW
const createReview = async (req, res) => {

    try {

        const {
            reviewer_id,
            reviewed_user_id,
            rating,
            comment
        } = req.body;

        const result = await db.query(
            `INSERT INTO reviews
            (reviewer_id, reviewed_user_id, rating, comment)
            VALUES ($1, $2, $3, $4)
            RETURNING *`,
            [reviewer_id, reviewed_user_id, rating, comment]
        );

        res.status(201).json(result.rows[0]);

    } catch (err) {

        console.log(err);
        res.status(500).json({ message: err.message });

    }

};

// GET ALL REVIEWS
const getReviews = async (req, res) => {

    try {

        const result = await db.query(
            "SELECT * FROM reviews ORDER BY review_id"
        );

        res.json(result.rows);

    } catch (err) {

        console.log(err);
        res.status(500).json({ message: err.message });

    }

};

// UPDATE REVIEW
const updateReview = async (req, res) => {

    try {

        const { id } = req.params;

        const {
            rating,
            comment
        } = req.body;

        const result = await db.query(
            `UPDATE reviews
             SET rating=$1,
                 comment=$2
             WHERE review_id=$3
             RETURNING *`,
            [rating, comment, id]
        );

        res.json(result.rows[0]);

    } catch (err) {

        console.log(err);
        res.status(500).json({ message: err.message });

    }

};

// DELETE REVIEW
const deleteReview = async (req, res) => {

    try {

        const { id } = req.params;

        await db.query(
            "DELETE FROM reviews WHERE review_id=$1",
            [id]
        );

        res.json({
            message: "Review Deleted Successfully"
        });

    } catch (err) {

        console.log(err);
        res.status(500).json({ message: err.message });

    }

};

module.exports = {

    createReview,
    getReviews,
    updateReview,
    deleteReview

};