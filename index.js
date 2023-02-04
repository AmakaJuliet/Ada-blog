if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

const express = require("express");
const mongoose = require("mongoose");
const articleRouter = require("./routes/article.router");
const authRouter = require("./routes/auth.router");
const userRouter = require("./routes/user.router");
mongoose.set('strictQuery', true);

async function startDB() {
    try {
      await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      })  
      console.log("Database is connected...");
    } catch (error) {
       console.log(`Database failed to connect: ${error.message}`); 
    }
}
const app = express();

app.use(express.urlencoded({extended: false}));
app.use(express.json());

startDB();

//routers

app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/article", articleRouter);

const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
})