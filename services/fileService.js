"use strict";

const fs = require("fs");

const QueryEnum = require("../enums/QueryEnum");

exports.isValidPath = (filePath) => fs.existsSync(filePath);

exports.isQueryValid = (orderBy, orderByDirection, filterByName) => {
  const admin = QueryEnum.filterByName.Admin.find((a) => a === filterByName);
  const manager = QueryEnum.filterByName.Manager.find(
    (a) => a === filterByName
  );

  return (
    orderBy in QueryEnum.orderBy &&
    orderByDirection in QueryEnum.orderByDirection &&
    (admin != undefined || manager != undefined)
  );
};

exports.isFile = (filePath) => {
  const stats = fs.statSync(filePath);
  return !stats.isDirectory();
};

exports.isDirectory = (filePath) => {
  const stats = fs.statSync(filePath);
  return stats.isDirectory();
};

exports.generateJson = (filePath, res) => {
  const allFiles = fs.readdirSync(filePath);
  const obj = {
    isDirectory: false,
    files: [],
  };

  obj.isDirectory = true;
  obj.files = allFiles;

  const jsonRes = JSON.stringify(obj);

  return res.status(200).send(jsonRes);
};

exports.generateBinary = (filePath, res) => {
  let readStream = fs.createReadStream(filePath);

  readStream.on("data", (chunk) => {
    return res.status(200).send(chunk);
  });
};
