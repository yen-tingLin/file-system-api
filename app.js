"use strict";

const express = require("express");
const fileRoute = require("./routes/fileRoute");

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static(__dirname + "/public"));

app.use("", fileRoute);

module.exports = app;
