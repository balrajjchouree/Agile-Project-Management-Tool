const dotenv = require("dotenv");
dotenv.config();

const http = require("http");
const app = require("./app");

const { connectDB, sequelize } = require("./config/database");

const PORT = process.env.PORT || 5000;

connectDB();
sequelize.sync();

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});