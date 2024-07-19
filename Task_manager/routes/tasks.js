    const express = require('express')
    const router = express.Router()
    const path = require('path')
    const {login,signup,getAllTasks,getTask,createTask,updateTask,deleteTask} = require('../controllers/tasks')
    const db = require('../controllers/database')
    const {query,body,validationResult} = require('express-validator')

    // const createTableQuery = `
    //     CREATE TABLE IF NOT EXISTS Tasks (
    //         id SERIAL PRIMARY KEY,
    //         task VARCHAR(100) NOT NULL,
    //         user_id INTEGER REFERENCES Users(id),
    //         created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    //         completed BOOLEAN DEFAULT FALSE,
    //         completed_at TIMESTAMP
    //     )
    // `

    // const createTableQuery = `
    //     CREATE TABLE IF NOT EXISTS Users (
    //         id SERIAL PRIMARY KEY,
    //         first_name VARCHAR(50) NOT NULL,
    //         last_name VARCHAR(50) NOT NULL,
    //         email VARCHAR(50) NOT NULL
    //     )
    // `

    // db.none(createTableQuery)
    //     .then(()=>{
    //         console.log('created table sucessfully')
    //     })
    //     .catch((err)=>{
    //         console.log(err)
    //     })


    const checkUser = async (req,res,next) => {
        if(!req.params.id){
            return next()
        }
        const user = await db.one('SELECT * FROM Users WHERE id = $1',[req.params.id])
        if(!user){
            res.send('User does not exist')
        }
    }

    // router.use('/:id/task/:taskid',checkUser)

    router.get('/user/:id',(req,res)=>{
        console.log("yo run bhayo")
        res.sendFile(path.join(__dirname, '../starter/public', 'home.html'));
    })

    // // for pulling all the task and creating a task
    router.route('/user/:id/tasks')
        .get((req,res)=>{
            try{
                console.log("calling getalltasks")
                getAllTasks(req,res)
            }catch(err){
                res.status(500),json(err)
            }
        })
        .post((req,res)=>{
            try{
                    createTask(req,res)
            }catch(err){
                throw new Error('User doesn\'t exist')
            }
        })
    

    // for getting, updating and deleting a specific task
    router.route('/user/:id/task/:taskId')
        .get((req,res)=>{
            res.sendFile(path.join(__dirname, '../starter/public', 'task.html'));
            // getTask(req,res)
        })
        .patch((req,res)=>{
            updateTask(req,res) 
        })
        .delete((req,res)=>{
            deleteTask(req,res)
        })

        router.route('/user/:id/get_task/:taskId')
        .get((req,res)=>{
            getTask(req,res)
        })

router.route('/login')
.get((req, res) => {
    console.log('routes ko login')
    res.sendFile(path.join(__dirname, '../starter/public', 'login.html'));
})
.post(async (req, res) => {
    try {
        await login(req,res)
    } catch (err) {
        res.status(500).send(err.message);
    }
})

router.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, '../starter/public', 'signup.html'));
});

router.post('/signup', body('email').trim().isEmail(), async (req, res) => {
    try {
        const result = validationResult(req);
        console.log(result)
        if (result.isEmpty()) {
            console.log("signup from routes")
            await signup(req,res)
        }
    } catch (err) {
        res.status(500).send(err.message);
    }
});

module.exports = router


