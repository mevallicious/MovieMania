const express =require("express")
const app = express()
const cookieParser = require("cookie-parser")
const authRouter = require("./routes/api.routes")
const userRouter = require("./routes/user.routes")
const movieRouter =require("./routes/movie.routes")

app.use(express.json())
app.use(cookieParser())


app.use("/api/auth",authRouter)
app.use("/api/user",userRouter)
app.use("/api/movies",movieRouter)


module.exports = app