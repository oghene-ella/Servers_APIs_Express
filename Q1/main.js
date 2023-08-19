/* Import all the modules needed */
const express = require("express");
const fs = require("fs").promises;
const path = require("path");

/* Create an Express Server */
const expressServer = express();

/* Create a port and hostname */
const port = 2130;
const hostname = "localhost";

/* Get the static files using path modules */
const indexFile = path.join(__dirname, "static", "index.html");
const errorFile = path.join(__dirname, "static", "error.html");

/* Create a middleware that serves static files from the "static" directory */
expressServer.use(express.static("static"));

/* Route for handling requests */
expressServer.get("/", async (req, res) => {
	try {
		const readIndex = await fs.readFile(indexFile);
		res.status(200);
        res.send(readIndex);
	} 
    
    catch (error) {
		console.error(error);
		res.status(500)
        res.send("Internal Server Error");
	}
});

/* Route for handling requests for other HTML files */
expressServer.get("/:filename", async (req, res) => {
	const requestedFile = req.params.filename;

	if (requestedFile.endsWith(".html")) {
		try {
			res.status(400);
			res.sendFile(errorFile);
		} 
        catch (error) {
			console.error(error);
			res.status(500);
			res.send("Internal Server Error");
		}
	} 
    
    else {
		res.status(404);
		res.send("File Not Found");
	}
});

/* Start the server */
expressServer.listen(port, hostname, () => {
	console.log(`Server is running at http://${hostname}:${port}`);
});
