    const express = require('express')
    const router = express.Router()
    const {getAllTasks,getTask,createTask,updateTask,deleteTask} = require('../controllers/tasks')
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

    router.use('/api/v1/tasks/:id/',checkUser)

    // for pulling all the task and creating a task
    router.route('/:id')
        .get((req,res)=>{
            try{
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

    // for signup
    router.route('/signup',(req,res)=>{
        res.send('signup')
    })

    // for login
    router.route('/login',(req,res)=>{
        res.send('login')
    })

    // for getting, updating and deleting a specific task
    router.route('/:id/:taskId')
        .get((req,res)=>{
            getTask(req,res)
        })
        .patch((req,res)=>{
            updateTask(req,res) 
        })
        .delete((req,res)=>{
            deleteTask(req,res)
        })

    module.exports = router