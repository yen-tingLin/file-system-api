"use strict";

const fs = require("fs");
const path = require("path");
const absPath = path.dirname(require.main.filename);

exports.sortBySize = (absPath, path) => {
  let files = fs.readdirSync(absPath + path);

  let filesWithStats = [];
  if (files.length > 1) {
    filesWithStats = sortFiles(files);
  } else {
    console.log("no exist file !");
  }
  return filesWithStats;
};

const sortFiles = (files) => {
  const res = [];

  let sorted = files.sort((a, b) => {
    let s1 = fs.statSync(absPath + path + a);
    let s2 = fs.statSync(absPath + path + b);
    return s1.size < s2.size;
  });

  sorted.forEach((file) => {
    res.push({
      filename: file,
      date: new Date(fs.statSync(absPath + path + file).size),
      path: path + file,
    });
  });

  return res;
};
