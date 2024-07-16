const express = require('express');
const app = express();
const port = 3000;
const tasks = require('./routes/tasks')
const db = require('./controllers/database')

const initialization = async() =>{
    try{
        await db.connect()
        .then(
            console.log("DB connected.")
        )
        app.listen(port, console.log(`Server is listening on port ${port}...`));
    }catch(err){
        console.log(err);
    }
}

initialization()
app.use(express.json())         // in order to get the data in req.body. It parses incoming requests with json payloads and is based on body-parser

app.use('/api/v1/tasks',tasks)
console.log('app.js running')









// app.use((req,res,next) => {
//     console.log('middleware')
//     next();
// })

// app.use((err,req,res,next)=> {
//     console.log('error middleware')
//     next(err)
// })

// app.get('/', (req,res)=>{
//     try{
//         fs.readFile()
//         console.log(a)
//         res.send("Task Manager App")
//     }catch(err){
//         throw new Error(
//             'Error heading to be shown'
//         )
//     }
// })

// app.get('/',(req,res,next) => {
//     fs.readFile('no', (err,data) => {
//         if(err){
//             next(err)
//         }
//         else{
//             res.send(data)
//         }
//     })
// })