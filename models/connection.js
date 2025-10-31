const mongoose = require("mongoose");

const connectionString = process.env.CONNECTION_STRING;
// const connectionString =
//   "mongodb+srv://elysa3148_dev:IYTdzst8yOlAzfQH@cluster0.ds1cgqb.mongodb.net/weatherapp";

mongoose
  .connect(connectionString, { connectTimeoutMS: 2000 })
  .then(() => console.log("Database connected"))
  .catch((error) => console.error(error));
