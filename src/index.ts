import app from './server';
import * as dotenv from 'dotenv'
dotenv.config()

app.listen(8000,()=>{
    console.log("app listening to port 8000...");
    
})