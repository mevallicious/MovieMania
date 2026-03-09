const express =require("express")
const app = express()
const cookieParser = require("cookie-parser")
const authRouter = require("./routes/api.routes")
const userRouter = require("./routes/user.routes")
const movieRouter =require("./routes/movie.routes")
const cors = require("cors")
const path= require("path")


app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET","POST","PUT","DELETE","OPTIONS"],
    allowedHeaders: ["Content-Type","Authorization"]
}))

app.use(express.json())
app.use(cookieParser())
app.use(express.static("./public"))


app.use("/api/auth",authRouter)
app.use("/api/user",userRouter)
app.use("/api/movies",movieRouter)
app.use("*name",(req,res)=>{
    res.sendFile(path.join(__dirname,"..","/public/index.html"))
})

module.exports = app