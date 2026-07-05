const db = require("../config/db");

// CREATE TRANSACTION
const createTransaction = async (req, res) => {
    try {

        const {
            listing_id,
            buyer_id,
            seller_id,
            amount,
            payment_method,
            status,
            transaction_type
        } = req.body;

        const result = await db.query(
            `INSERT INTO transactions
            (listing_id,buyer_id,seller_id,amount,payment_method,status,transaction_type)
            VALUES($1,$2,$3,$4,$5,$6,$7)
            RETURNING *`,
            [
                listing_id,
                buyer_id,
                seller_id,
                amount,
                payment_method,
                status,
                transaction_type
            ]
        );

        res.status(201).json(result.rows[0]);

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
};

// GET ALL TRANSACTIONS
const getTransactions = async (req, res) => {

    try {

        const result = await db.query(
            "SELECT * FROM transactions ORDER BY transaction_id"
        );

        res.json(result.rows);

    } catch (err) {

        console.log(err);
        res.status(500).json({ message: err.message });

    }

};

// UPDATE TRANSACTION
const updateTransaction = async (req, res) => {

    try {

        const { id } = req.params;

        const {
            amount,
            payment_method,
            status
        } = req.body;

        const result = await db.query(
            `UPDATE transactions
             SET amount=$1,
                 payment_method=$2,
                 status=$3
             WHERE transaction_id=$4
             RETURNING *`,
            [amount, payment_method, status, id]
        );

        res.json(result.rows[0]);

    } catch (err) {

        console.log(err);
        res.status(500).json({ message: err.message });

    }

};

// DELETE TRANSACTION
const deleteTransaction = async (req, res) => {

    try {

        const { id } = req.params;

        await db.query(
            "DELETE FROM transactions WHERE transaction_id=$1",
            [id]
        );

        res.json({
            message: "Transaction Deleted Successfully"
        });

    } catch (err) {

        console.log(err);
        res.status(500).json({ message: err.message });

    }

};

module.exports = {
    createTransaction,
    getTransactions,
    updateTransaction,
    deleteTransaction
};