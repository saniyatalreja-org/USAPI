const db = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
    try {
        const {
            full_name,
            email,
            password,
            phone,
            department,
            batch,
            role
        } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await db.query(
            `INSERT INTO users
            (full_name, email, password, phone, department, batch, role)
            VALUES ($1,$2,$3,$4,$5,$6,$7)
            RETURNING *`,
            [
                full_name,
                email,
                hashedPassword,
                phone,
                department,
                batch,
                role
            ]
        );

        res.json(result.rows[0]);

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
};

const login = async (req, res) => {
    try {

        const { email, password } = req.body;

        const result = await db.query(
            "SELECT * FROM users WHERE email=$1",
            [email]
        );

        if (result.rows.length === 0) {
            return res.status(400).json({
                message: "User not found"
            });
        }

        const user = result.rows[0];

        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            return res.status(400).json({
                message: "Incorrect Password"
            });
        }

        const token = jwt.sign(
            {
                id: user.user_id,
                email: user.email
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d"
            }
        );

        res.json({
            message: "Login Successful",
            token,
            user
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: err.message
        });
    }
};

module.exports = {
    register,
    login
};