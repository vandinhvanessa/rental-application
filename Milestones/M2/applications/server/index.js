const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json())
app.use(cors());
const db = require("./models");

const postRouter = require("./routes/Posts");
app.use("/posts", postRouter);

const commentsRouter = require("./routes/Comments");
app.use("/comments", commentsRouter);

const usersRouter = require("./routes/Users");
app.use("/auth", usersRouter);

const transactionRouter = require("./routes/Transactions");
app.use("/transactions", transactionRouter);

const inventoryRouter = require("./routes/Inventory");
app.use("/inventory", inventoryRouter);


db.sequelize.sync().then(() => {
    app.listen(3001, () => {
        console.log("Server running on Port 3001");
    });
});
