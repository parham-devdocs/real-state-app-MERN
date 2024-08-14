import express from "express";
import auth from "./routes/auth.js";
import cookieParser from "cookie-parser";
const app = express()

app.use(express.json())
app.use(cookieParser)
app.get('/api/user', (req,res) => {
    res.send('worked')
})

app.use('/api/auth',auth)

app.listen(8800, () => {
    console.log('listening on porn 8800');
    
})