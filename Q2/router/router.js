/* import all the inbuilt and custom controller modules */
const express = require('express');
const bodyParser = require("body-parser");
const getController = require("../controllers/getController");
const postController = require("../controllers/postController");
const updateController = require("../controllers/updateController.js");
const deleteController = require("../controllers/deleteController.js");

/* create a router object using express.router() */
const dataRouter = express.Router();

/* create a middleware that parses requests [json data] */
dataRouter.use(bodyParser.json());

/* create the get method to get all items */
dataRouter.get("/", getController.getData);

/* create the get method to get all items */
dataRouter.get("/:id", getController.getOneData);

/* create the get method to get all items */
dataRouter.post("/", postController.postData);

/* create the put method to update an item */
dataRouter.put("/:id", updateController.updateData);

/* create the delete method to delete an item */
dataRouter.delete("/:id", deleteController.deleteData);

module.exports = dataRouter;

