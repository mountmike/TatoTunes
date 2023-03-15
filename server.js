const express = require("express");
const app = express();
const port = process.env.PORT || 8888;
const expressLayouts = require("express-ejs-layouts");
const methodOverride = require("./middlewares/method_override");
const setCurrentUser = require("./middlewares/set_current_user");
const viewHelpers = require("./middlewares/view_helpers");
const feedController = require("./controllers/feed_controller");
const postController = require("./controllers/post_controller");
const sessionController = require("./controllers/session_controller");
const userController = require("./controllers/user_controller");
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);

// const MemoryStore = require('memorystore')(session);
const db = require("./db");

// configs
app.set("view engine", "ejs");
app.set("layout layout_login", false);
app.use(expressLayouts);
app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride);
app.use(session({
  store: new pgSession({
    pool : db,                // Connection pool
    tableName: "session"
  }),
  secret: "go dogs god",
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 } // 30 days
  // Insert express-session options here
}));


app.use(setCurrentUser);
app.use(viewHelpers);


// Routes & controllers
app.use("/session", sessionController);
app.use("/feed", feedController);
app.use("/post", postController);

app.use("/user", userController);





app.listen(port, () => {
    console.log(`now listening on ${port}`);
})