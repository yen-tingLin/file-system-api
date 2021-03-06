"use strict";

const express = require("express");
const FileController = require("../controllers/fileController");

const router = express.Router();

router.get("", (req, res) => res.send("RESTful API for File System"));

/**
 * 1 ~ 3. Request GET - if the request target is file / directory
 */
router.get("/file/*", FileController.getFiles);

/**
 * 4. Request POST - To create a file in specified {localSystemFilePath}
 */
router.post("/file/*", FileController.createFile);

/**
 * 5. Request PATCH - To update file in specified {localSystemFilePath}
 */
router.patch("/file/*", FileController.updateFile);

/**
 * 6. Request Delete - To delete file in specified {localSystemFilePath}
 */
router.delete("/file/*", FileController.deleteFile);

module.exports = router;
