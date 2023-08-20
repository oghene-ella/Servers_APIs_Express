const path = require("path");
const fs = require("fs");

const dbFile = path.join(__dirname, "../db", "inventory.json");

const updateData = (req, res) => {
    const dataDB = fs.readFileSync(dbFile);

    const the_data = JSON.parse(dataDB);

    const dataToUpdate = req.body;

    const id = req.params.id;

    const getIndex = the_data.findIndex((data) => data.id == parseInt(id));

    if (getIndex == -1) {
        res.status(404);
        res.end("data not found");
    }
    
    the_data[getIndex] = { ...the_data[getIndex], ...dataToUpdate };

    fs.writeFile(dbFile, JSON.stringify(the_data), (error) => {
        if (error) {
            res.status(500);
            res.end("update not successful");
        }

        res.status(200);
        res.json(the_data[getIndex]);
        res.send("Successfully updated the data");
    });

}

module.exports = {
	updateData,
};