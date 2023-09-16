/**
 * ? End Ponts
 *  GET /blogs => to get all blogs
 *  GET /blog/{number} to get single blog
 *  POST /blog to create new blog
 *  PUT/PATCH /blog/update?id={number} to update single blog by id
 *  DELETE /blog/delete?id={number} to delete single blog by id
 */

require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const port = process.env.PORT || 3001;
const router = require("./routes/index");

app.use(express.json());

app.use("/", router);
app.listen(port, () =>
  console.log(`Server listen on port ${port} \nurl = http://localhost:${port}`)
);

mongoose.connect(process.env.MONGODB_URL, { dbName: "Blog-DB" });
