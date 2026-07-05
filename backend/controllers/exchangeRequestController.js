const db = require("../config/db");

// CREATE EXCHANGE REQUEST

const createExchangeRequest = async (req, res) => {

    try {

        const {

            listing_id,
            sender_id,
            receiver_id,
            message,
            status

        } = req.body;

        const result = await db.query(

            `INSERT INTO exchange_requests

            (listing_id, sender_id, receiver_id, message, status)

            VALUES($1,$2,$3,$4,$5)

            RETURNING *`,

            [

                listing_id,
                sender_id,
                receiver_id,
                message,
                status

            ]

        );

        res.status(201).json(result.rows[0]);

    }

    catch(err){

        console.log(err);

        res.status(500).json({

            message: err.message

        });

    }

};

// GET ALL REQUESTS

const getExchangeRequests = async (req, res) => {

    try {

        const result = await db.query(

            "SELECT * FROM exchange_requests ORDER BY request_id"

        );

        res.json(result.rows);

    }

    catch(err){

        console.log(err);

        res.status(500).json({

            message: err.message

        });

    }

};

// UPDATE REQUEST

const updateExchangeRequest = async (req, res) => {

    try {

        const { id } = req.params;

        const {

            message,
            status

        } = req.body;

        const result = await db.query(

            `UPDATE exchange_requests

            SET

            message=$1,
            status=$2

            WHERE request_id=$3

            RETURNING *`,

            [

                message,
                status,
                id

            ]

        );

        res.json(result.rows[0]);

    }

    catch(err){

        console.log(err);

        res.status(500).json({

            message: err.message

        });

    }

};

// DELETE REQUEST

const deleteExchangeRequest = async (req, res) => {

    try {

        const { id } = req.params;

        await db.query(

            "DELETE FROM exchange_requests WHERE request_id=$1",

            [id]

        );

        res.json({

            message: "Exchange Request Deleted Successfully"

        });

    }

    catch(err){

        console.log(err);

        res.status(500).json({

            message: err.message

        });

    }

};

module.exports = {

    createExchangeRequest,
    getExchangeRequests,
    updateExchangeRequest,
    deleteExchangeRequest

};