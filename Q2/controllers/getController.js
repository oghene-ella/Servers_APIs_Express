const path = require("path");
const fs = require("fs");

const dbFile = path.join(__dirname, "../db", "inventory.json");

/* Get all Data */
const getData = (req, res) => {
	const dataDB = fs.readFileSync(dbFile);
	res.status(200)
	res.send(JSON.parse(dataDB));
};

/* Get One Data */
const getOneData = (req, res) => {
	const dataDB = fs.readFileSync(dbFile);
	const theData = JSON.parse(dataDB);

	const dataId = req.params.id;

	const getData = theData.find((data) => {
		return data.id == parseInt(dataId);
	});

	if (!getData) {
		return res.status(404).send(`Sorry! Data, not found`);
	}
	res.status(200)
    res.json(getData);
};

module.exports = {
	getData,
	getOneData
};