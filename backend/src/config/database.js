const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database.sqlite",
  logging: false
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("SQLite connected");
  } catch (error) {
    console.error("DB connection failed:", error);
  }
};

module.exports = { sequelize, connectDB };