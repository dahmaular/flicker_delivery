const mongoose = require("mongoose");
const express = require("express");
const app = express();
const config = require("config");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");

const users = require("./src/api/v1.0/routes/users");
const auth = require("./src/api/v1.0/routes/authenticate");
const pickup = require("./src/api/v1.0/routes/pickups");
const delivery = require("./src/api/v1.0/routes/deliveries");
const request = require("./src/api/v1.0/routes/requests");

if (!config.get("jwtPrivateKey")) {
  console.error("FATAL ERROR: jwtPrivateKey is not defined!");
  process.exit(1);
}

mongoose
  .connect("mongodb://localhost/flicker_delivery")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error());

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Flicker Rave API",
      version: "1.0.0",
      description: "Flicker Rave delivery API",
    },
    servers: [
      {
        url: "http://localhost:3002",
      },
    ],
  },
  apis: ["./src/api/v1.0/routes/*.js"],
};

const specs = swaggerJsDoc(options);

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

app.use(express.json());
app.use("/api/users", users);
app.use("/api/auth", auth);
app.use("/api/pickup", pickup);
app.use("/api/delivery", delivery);
app.use("/api/request", request);

const port = process.env.PORT || 3002;
app.listen(port, () => console.log(`Listening on port ${port}...`));
