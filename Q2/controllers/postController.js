const path = require("path");
const fs = require("fs");

const dbFile = path.join(__dirname, "../db", "inventory.json");

/* Post an item */
const postData = (req, res) => {
	const dataDB = fs.readFileSync(dbFile);

	const data = JSON.parse(dataDB);

	const dataToAdd = req.body;

	const addIt = {
		...dataToAdd,
		id: Math.floor(Math.random() * 100).toString(),
	};

	data.push(addIt);

	fs.writeFile(dbFile, JSON.stringify(data), (error) => {
		if (error) {
			res.status(500);
            res.send("An error has occurred");
		}

		res.status(200);
        res.json(data);
	});
};

module.exports = {
	postData
};
