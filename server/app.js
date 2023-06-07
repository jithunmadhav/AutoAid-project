
import  express  from 'express' 
import path from 'path'
import { dbconnect } from './config.js'
import userRoute from './routes/userRoute.js'
import mechanicRoute from './routes/mechanicRoute.js'
import  adminRoute from './routes/adminRoute.js'
import cors from 'cors'
import 'dotenv/config'
import cookieparser from 'cookie-parser'
const app=express()
dbconnect();
app.use(cors({
    origin: ['http://localhost:3000', 'http://192.168.191.127:3000'],
    credentials: true
  }));
  
app.use(express.static(path.resolve()+"/public"))
app.use(express.json());
app.use(cookieparser())
app.use(express.urlencoded({ extended: true }));
app.use('/user',userRoute)
app.use('/mechanic',mechanicRoute)
app.use('/admin',adminRoute)


app.listen(4000,()=>{
    console.log("localhost running on http://localhost:4000");

})