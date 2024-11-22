const express = require('express');
const cors = require('cors'); // Import cors module

const app = express();

// Use cors middleware to allow all origins
app.use(cors());

// ... your other routes and server setup ...

const PORT = process.env.PORT || 3200;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});