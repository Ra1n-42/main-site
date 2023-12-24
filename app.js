const express = require("express");
const { requireAuth, checkUser } = require("./middleware/authMiddleware");
const authRoutes = require("./routes/authRoutes");
const cookieParser = require("cookie-parser");
const path = require("path");
const Database = require("./models/db");

// test
const Collection = require("./models/collection");

// load env
require("dotenv").config();

// set variables
const app = express();
const port = 3001;
const dbURI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_USER_PASSWORD}@cluster0.wz15r9n.mongodb.net/node-auth`;
const db = new Database(dbURI);

// middleware
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(cookieParser());

// view engine
app.set("view engine", "ejs");

// Funktion zum Starten des Servers
const startServer = () => {
  app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });
};

// Verbindung zur Datenbank herstellen und dann den Server starten
db.connect().then((isConnected) => {
  if (isConnected) {
    startServer();
  }
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

app.use(authRoutes);
