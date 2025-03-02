import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";


dotenv.config({
  path: './env'
})

const port = process.env.PORT || 8000;

app.on("error" , (err) => {
  console.log("Error in server" , err);
})

connectDB()
.then(() => {
  app.listen(`${port}`, () => {
    console.log(`Server is running on port ${port}`);
  })

})
.catch((err) => {
  console.log("MONGO_DB connection failed" , err);
})