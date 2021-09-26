"use strict";

const FileService = require("../services/fileService");

/**
 * Get binary stream if it is a file; get json content if it is a directory
 * @param {*} req
 * @param {*} res
 * @returns
 */
exports.getFiles = (req, res) => {
  // 1-1. {localSystemFilePath}
  const filePath = req.path;
  console.log("filePath: ", filePath);
  // 1-2. {orderBy} & {orderByDirection} & {filterByName}
  const fileQuery = req.query;

  const validPath = FileService.isValidPath("." + filePath);
  if (!validPath) {
    return res.status(404).json({
      status: "failed",
      message: "Invalid File",
    });
  }

  // 1-3 {orderBy} support enum[lastModified, size, fileName]
  // 1-4 {orderByDirection} support enum [Descending , Ascending]
  // 1-5 {filterByName} support file name filter which only shows the results contains filter string in ignore case condition
  const validQuery = FileService.isQueryValid(
    fileQuery.orderBy,
    fileQuery.orderByDirection,
    fileQuery.filterByName
  );

  if (!validQuery) {
    return res.status(404).json({
      status: "failed",
      message: "Invalid Query",
    });
  }

  // 2. Request GET - if the request target is file. Return binary stream
  if (FileService.isFile("." + filePath)) {
    FileService.generateBinary("." + filePath, res);
  }

  // 3. Request GET - if the request target is directory. Return json content
  if (FileService.isDirectory("." + filePath)) {
    FileService.generateJson("." + filePath, res);
  }
};

/**
 * Create a file if dose not exist
 * @param {*} req
 * @param {*} res
 * @returns
 */
exports.createFile = (req, res) => {
  const filePath = req.path;
  const validPath = FileService.isValidPath("." + filePath, res);
  if (validPath) {
    return res.status(424).json({
      status: "failed",
      message: "File already exist",
    });
  }

  // create a new file
  const file = req.body.file;
};

/**
 * Update a file if it exists
 * @param {*} req
 * @param {*} res
 * @returns
 */
exports.updateFile = (req, res) => {
  const filePath = req.path;
  const validPath = FileService.isValidPath("." + filePath, res);
  if (!validPath) {
    return res.status(404).json({
      status: "failed",
      message: "File not found",
    });
  }

  // update an existing file
  const file = req.body.file;
};

/**
 * Delete a file if it exists
 * @param {*} req
 * @param {*} res
 * @returns
 */
exports.deleteFile = (req, res) => {
  const filePath = req.path;
  const validPath = FileService.isValidPath("." + filePath, res);
  if (!validPath) {
    return res.status(404).json({
      status: "failed",
      message: "File not found",
    });
  }

  // delete the file
};
