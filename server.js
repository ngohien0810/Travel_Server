require("dotenv").config();
let app = require("./app");
const http = require("http");

// get port from environment and store in Express.
const port = process.env.PORT || "5000";

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
