// models/db.js
const mongoose = require("mongoose");

class Database {
  constructor(dbURI) {
    this.dbURI = dbURI;
    this.isConnected = false;
  }

  async connect() {
    try {
      await mongoose.connect(this.dbURI);
      console.log("Connected to the database");
      this.isConnected = true;
    } catch (err) {
      console.error("Connection to the database failed");
      console.error(err);
      this.isConnected = false;
    }

    return this.isConnected; // Gibt den Status der Verbindung zurück
  }
}

module.exports = Database;
