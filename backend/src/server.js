const dotenv = require("dotenv");
dotenv.config();

const http = require("http");
const app = require("./app");

const { connectDB, sequelize } = require("./config/database");
const runCron = require("./utils/cron");

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();
    await sequelize.sync({ alter: true});

    runCron();

    const server = http.createServer(app);

    server.listen(PORT, () => {
      console.log(`Server is running on ${PORT}`);
    });

  } catch (error) {
    console.error("Server start error:", error);
  }
};

startServer();