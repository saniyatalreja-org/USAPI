const db = require("../config/db");

// CREATE UNIVERSITY

const createUniversity = async (req, res) => {

    try {

        const {

            university_name,
            city

        } = req.body;

        const result = await db.query(

            `INSERT INTO universities
            (university_name, city)
            VALUES ($1, $2)
            RETURNING *`,

            [

                university_name,
                city

            ]

        );

        res.status(201).json(result.rows[0]);

    } catch (err) {

        console.log(err);

        res.status(500).json({

            message: err.message

        });

    }

};

// GET ALL UNIVERSITIES

const getUniversities = async (req, res) => {

    try {

        const result = await db.query(

            "SELECT * FROM universities ORDER BY university_id"

        );

        res.json(result.rows);

    } catch (err) {

        console.log(err);

        res.status(500).json({

            message: err.message

        });

    }

};

// UPDATE UNIVERSITY

const updateUniversity = async (req, res) => {

    try {

        const { id } = req.params;

        const {

            university_name,
            city

        } = req.body;

        const result = await db.query(

            `UPDATE universities

            SET

            university_name=$1,
            city=$2

            WHERE university_id=$3

            RETURNING *`,

            [

                university_name,
                city,
                id

            ]

        );

        res.json(result.rows[0]);

    } catch (err) {

        console.log(err);

        res.status(500).json({

            message: err.message

        });

    }

};

// DELETE UNIVERSITY

const deleteUniversity = async (req, res) => {

    try {

        const { id } = req.params;

        await db.query(

            "DELETE FROM universities WHERE university_id=$1",

            [id]

        );

        res.json({

            message: "University Deleted Successfully"

        });

    } catch (err) {

        console.log(err);

        res.status(500).json({

            message: err.message

        });

    }

};

module.exports = {

    createUniversity,
    getUniversities,
    updateUniversity,
    deleteUniversity

};