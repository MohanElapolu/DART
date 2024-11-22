const express = require('express');
const cors = require('cors');
const app = express();
const port = 3100;

//app.get('/', (req, res) => {
//  res.sendFile(__dirname + '/artifact_1.txt');
//});
app.use(cors());

// Specify the directory where your text files are located
const filesDirectory = __dirname;

// Serve static files from the specified directory
app.use(express.static(filesDirectory));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});