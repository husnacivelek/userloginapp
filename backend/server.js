const express = require("express");
const app = express();
const cors = require("cors");
require('dotenv').config();

const PORT =  process.env.port || 5000;

app.use(express.json())
app.use(cors())

app.use("/auth", require("./routes/jwtAuth"));

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});