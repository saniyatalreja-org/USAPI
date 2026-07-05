const db = require("../config/db");

// CREATE MESSAGE

const createMessage = async (req, res) => {

    try {

        const {

            sender_id,
            receiver_id,
            message

        } = req.body;

        const result = await db.query(

            `INSERT INTO messages

            (sender_id, receiver_id, message)

            VALUES($1,$2,$3)

            RETURNING *`,

            [

                sender_id,
                receiver_id,
                message

            ]

        );

        res.status(201).json(result.rows[0]);

    }

    catch(err){

        console.log(err);

        res.status(500).json({

            message:err.message

        });

    }

};

// GET ALL MESSAGES

const getMessages = async(req,res)=>{

    try{

        const result=await db.query(

            "SELECT * FROM messages ORDER BY message_id"

        );

        res.json(result.rows);

    }

    catch(err){

        console.log(err);

        res.status(500).json({

            message:err.message

        });

    }

};

// UPDATE MESSAGE

const updateMessage=async(req,res)=>{

    try{

        const {id}=req.params;

        const {message}=req.body;

        const result=await db.query(

            `UPDATE messages

            SET message=$1

            WHERE message_id=$2

            RETURNING *`,

            [

                message,
                id

            ]

        );

        res.json(result.rows[0]);

    }

    catch(err){

        console.log(err);

        res.status(500).json({

            message:err.message

        });

    }

};

// DELETE MESSAGE

const deleteMessage=async(req,res)=>{

    try{

        const {id}=req.params;

        await db.query(

            "DELETE FROM messages WHERE message_id=$1",

            [id]

        );

        res.json({

            message:"Message Deleted Successfully"

        });

    }

    catch(err){

        console.log(err);

        res.status(500).json({

            message:err.message

        });

    }

};

module.exports={

    createMessage,
    getMessages,
    updateMessage,
    deleteMessage

};