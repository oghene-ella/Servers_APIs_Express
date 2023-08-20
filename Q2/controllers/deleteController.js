const path = require("path");
const fs = require("fs");

const dbFile = path.join(__dirname, "../db", "inventory.json");

const deleteData = (req, res) => {
	const dataDB = fs.readFileSync(dbFile);

	const the_data = JSON.parse(dataDB);

	const id = req.params.id;

	const getIndex = the_data.findIndex((data) => data.id == parseInt(id));

	if (getIndex == -1) {
		res.status(404);
		res.end("data not found");
	}

    the_data.splice(getIndex, 1)

	fs.writeFile(dbFile, JSON.stringify(the_data), (error) => {
		if (error) {
			res.status(500);
			res.end("update not successful");
		}

		res.status(200);
        res.send("Successfully deleted the data")
	});
};

module.exports = {
	deleteData,
};
