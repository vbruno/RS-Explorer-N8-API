require("express-async-errors");
const migrationsRun = require("./database/sqlite/migrations");
const express = require("express");

const AppError = require("./utils/AppError");
const routes = require("./routes");

migrationsRun();

const app = express();
app.use(express.json());

app.use(routes);

app.use((error, request, response, next) => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: "error",
      error: error.message,
    });
  }

  console.log(error);

  return response.status(500).json({
    status: "error",
    error: "Internal Server Error",
  });
});

const PORT = 3333;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
