
import  express  from 'express' 
import { dbconnect } from './config.js'
import userRoute from './routes/userRoute.js'
import mechanicRoute from './routes/mechanicRoute.js'
import  adminRoute from './routes/adminRoute.js'
import 'dotenv/config'
const app=express()
dbconnect();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/',userRoute)
app.use('/mechanic',mechanicRoute)
app.use('/admin',adminRoute)


app.listen(4000,()=>{
    console.log("localhost running on http://localhost:4000");

})