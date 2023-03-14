const express = require("express");
const app = express();
const port = process.env.PORT || 8888;
const expressLayouts = require("express-ejs-layouts");
const methodOverride = require("./middlewares/method_override");
const setCurrentUser = require("./middlewares/set_current_user");
const viewHelpers = require("./middlewares/view_helpers");
const feedController = require("./controllers/feed_controller");
const postController = require("./controllers/post_controller");
const session = require("express-session");
const MemoryStore = require('memorystore')(session);
const db = require("./db");

// configs
app.set("view engine", "ejs");
app.set("layout layout_login", false);
app.use(expressLayouts);
app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride);
app.use(session({
    cookie: { maxAge: 86400000 },
    store: new MemoryStore({
      checkPeriod: 86400000 // prune expired entries every 24h
    }),
    secret: process.env.SESSION_SECRET || 'Godogsgo',
    resave: false,
    saveUninitialized: true,
}));
app.use(setCurrentUser);
app.use(viewHelpers);


// Routes & controllers
app.use("/feed", feedController)
app.use("/post", postController)





app.listen(port, () => {
    console.log(`now listening on ${port}`);
})