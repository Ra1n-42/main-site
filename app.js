const express = require("express");
const { requireAuth, checkUser } = require("./middleware/authMiddleware");
const authRoutes = require("./routes/authRoutes");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const path = require("path");

// test
const Collection = require("./models/collection");

require("dotenv").config();

const app = express();
const port = 3001;

// middleware
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(cookieParser());

// view engine
app.set("view engine", "ejs");

// database connection
const dbURI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_USER_PASSWORD}@cluster0.wz15r9n.mongodb.net/node-auth`;
mongoose
  .connect(dbURI)
  .then(() =>
    app.listen(port, () => {
      console.log(`server is running open http://localhost:${port}`);
    })
  )
  .catch((err) => {
    console.log("Connection Failed");
    console.log(err);
  });

// routes
app.get("*", checkUser);
app.get("/upload", requireAuth, (req, res) => {
  res.render("upload");
});

app.get("/profileimg/:userId", (req, res) => {
  const { userId } = req.params;
  const imagePath = path.join(
    process.cwd(),
    "public",
    "profiles",
    userId,
    "avatar",
    "3.png"
  );
  res.sendFile(imagePath);
});

app.get(
  "/create_collection/:collName",
  checkUser,
  requireAuth,
  async (req, res) => {
    // res.send(res.locals.user)

    const { collName } = req.params;
    const { name, _id } = res.locals.user;
    try {
      const coll = await Collection.create({
        creator: _id,
        collectionname: collName,
        items: ["item1", "item2", "..."],
      });
      res.status(201).json({ coll: coll._id });
    } catch (err) {
      res.status(400).json({ err });
    }
  }
);
app.get("/collection/:collName", async (req, res) => {
  const { collName } = req.params;

  const coll = await Collection.itemsFromCollection(collName);
  if (!coll.length == 0) {
    res.send(coll);
  } else {
    res.render("error");
  }
});
app.get("/MyCollection", checkUser, requireAuth, (req, res) => {
  res.render("mycollection", {
    style: "mycollection.css",
  });
});

app.use(authRoutes);
