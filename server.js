const express = require("express");
const app = express();
const port = process.env.PORT || 8888;
const expressLayouts = require("express-ejs-layouts");

const methodOverride = require("./middlewares/method_override")
const setCurrentUser = require("./middlewares/setCurrentUser")

const dishController = require("./controllers/dish_controller")
const userController = require("./controllers/user_controller")
const sessionController = require("./controllers/session_controller")

const session = require("express-session")
const MemoryStore = require('memorystore')(session)
const db = require("./db")









app.listen(port, () => {
    console.log(`now listening on ${port}`);
})