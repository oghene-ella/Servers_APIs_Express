/* Import all the modules needed for Question 1 */
const express = require('express');
const fs = require('fs').promises;
const path = require('path');

/* Create an Express Server */
const expressServer = express();

/* Create a port and hostname */
const port = 2130;
const hostname = 'localhost';

/* Get the static files using path modules */
const indexFile = path.join(__dirname, "static", "index.html");
const errorFile = path.join(__dirname, "static", "error.html");

/* Create a middleware that can get static files */
expressServer.use(express.static("static"))

/* Get /index.html file */
expressServer.get("/index.html", async (req, res) => {
    const readIndex = await fs.readFile(indexFile);
    res.status(200);
    res.sendFile(readIndex);
})

/* Get /{random}.html file */
expressServer.get("*", async (req, res) => {
	try {
		const readFileError = await fs.readFile(errorFile);
        res.status(404);
        // fix this error [ its in buffer]
        console.log(readFileError)
		// res.sendFile(readError);
	} 
    catch (error) {
		console.log(error);
	}
});


/* Add an Event Listener  */
expressServer.listen(port, hostname, () => {
    console.log(`Connecting to http://${hostname}:${port}`);
})
