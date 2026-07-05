const db = require("../config/db");

// CREATE PROJECT REQUEST

const createProjectRequest = async (req, res) => {

    try {

        const {

            user_id,
            project_title,
            project_category,
            description,
            required_members,
            deadline,
            status

        } = req.body;

        const result = await db.query(

            `INSERT INTO project_requests

            (user_id, project_title, project_category, description,
            required_members, deadline, status)

            VALUES($1,$2,$3,$4,$5,$6,$7)

            RETURNING *`,

            [

                user_id,
                project_title,
                project_category,
                description,
                required_members,
                deadline,
                status

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

// GET ALL PROJECT REQUESTS

const getProjectRequests = async (req, res) => {

    try {

        const result = await db.query(

            "SELECT * FROM project_requests ORDER BY request_id"

        );

        res.json(result.rows);

    } catch (err) {

        console.log(err);

        res.status(500).json({

            message: err.message

        });

    }

};

// UPDATE PROJECT REQUEST

const updateProjectRequest = async (req, res) => {

    try {

        const { id } = req.params;

        const {

            project_title,
            project_category,
            description,
            required_members,
            deadline,
            status

        } = req.body;

        const result = await db.query(

            `UPDATE project_requests

            SET

            project_title=$1,
            project_category=$2,
            description=$3,
            required_members=$4,
            deadline=$5,
            status=$6

            WHERE request_id=$7

            RETURNING *`,

            [

                project_title,
                project_category,
                description,
                required_members,
                deadline,
                status,
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

// DELETE PROJECT REQUEST

const deleteProjectRequest = async (req, res) => {

    try {

        const { id } = req.params;

        await db.query(

            "DELETE FROM project_requests WHERE request_id=$1",

            [id]

        );

        res.json({

            message: "Project Request Deleted Successfully"

        });

    } catch (err) {

        console.log(err);

        res.status(500).json({

            message: err.message

        });

    }

};

module.exports = {

    createProjectRequest,
    getProjectRequests,
    updateProjectRequest,
    deleteProjectRequest

};