const HttpError = require("./error");

module.exports = (err, req, res, next) => {
  let status = 500;
  let message = "Internal Server Error";
  if (err instanceof HttpError) {
    status = err.status;
    message = err.message;
  }

  // else if (Object.getPrototypeOf(err.constructor).name === "MongooseError") {
  //   switch (err.name) {
  //     case "ValidationError":
  //       status = 400;
  //       message = "Invalid data";
  //       break;
  //     case "CastError":
  //       status = (req.method === "GET" ? 404 : 400);
  //       message = "Item not found";
  //       break;
  //   }
  // }

  else if (err.name === "ValidationError") {
    status = 400;
    message = "Invalid data";
  } else if (err.name === "CastError") {
    status = (req.method === "GET" ? 404 : 400);
    message = "Item not found";
  }
  res.status(status).json({
    success: false,
    error: message,
  });
};