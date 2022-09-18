const express = require("express");
const app = express();
const cors = require("cors");
// const morgan = require("morgan");

app.use(express.json());
app.use(cors());
// app.use(morgan("common"));

const db = require("./models");

// Routers
const authRouter = require("./routes/Auth");
app.use("/auth", authRouter);

const postRouter = require("./routes/Posts");
app.use("/posts", postRouter);

const commentsRouter = require("./routes/Comments");
app.use("/comments", commentsRouter);

const usersRouter = require("./routes/Users");
app.use("/users", usersRouter);

const likesRouter = require("./routes/Likes");
app.use("/likes", likesRouter);

const rolesRouter = require("./routes/Roles");
app.use("/roles", rolesRouter);

const stockRouter = require("./routes/BloodStock");
app.use("/stock", stockRouter);

const transactionRouter = require("./routes/Transactions");
app.use("/transactions", transactionRouter);

db.sequelize.sync().then(() => {
  app.listen(3006, () => {
    console.log("Server running on port 3006");
  });
});
