
const router = require("express").Router();
const pool = require("../db")
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator");
const validInfo = require("../middleware/validInfo");
const authorization = require("../middleware/authorization");

router.post("/register", validInfo, async(req, res) => {
    try {
        const {name, email, password} = req.body;
        const user = await pool.query("SELECT * FROM Users WHERE email = $1", [email]);

        if(user.rows.length !== 0)
        {
            return res.status(401).json({ error: "User already exists" });
        }
        
        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound);
        const bcryptPassword = await bcrypt.hash(password, salt);

        const newUser = await pool.query(
            "INSERT INTO Users (name, email, password) VALUES ($1, $2, $3) RETURNING *", 
            [name, email, bcryptPassword]);

            const token = jwtGenerator(newUser.rows[0].id);

            res.json({token});
            
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});

router.post("/login",validInfo, async(req,res) => {
    try {

        const {email, password} = req.body;
        const user = await pool.query("SELECT * FROM Users WHERE email = $1", [email]);

        if(user.rows.length === 0)
        {
            return res.status(401).json({ error: "Password or email is incorrect" });
        }

        const validPassword = await bcrypt.compare(password, user.rows[0].password);

        if(!validPassword)
        {
            return res.status(401).json({ error: "Password or email is incorrect" });
        }

        const token = jwtGenerator(user.rows[0].id);

        res.json({token});

        
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});

router.get("/verify", authorization,async(req,res) => {
    try {
        
        res.json(true);
        
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});


module.exports = router;