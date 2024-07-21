    const express = require('express')
    const router = express.Router()
    const path = require('path')
    const {login,logout,signup,getAllTasks,getTask,createTask,updateTask,deleteTask} = require('../controllers/tasks')
    const db = require('../controllers/database')
    const {query,body,validationResult} = require('express-validator')

    // const createTableQuery = `
    //     CREATE TABLE IF NOT EXISTS Tasks (
    //         id SERIAL PRIMARY KEY,
    //         task VARCHAR(100) NOT NULL,
    //         user_id INTEGER REFERENCES Users(id),
    //         created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    //         completed BOOLEAN DEFAULT FALSE,
    //     )
    // `

    // const createTableQuery = `
    //     CREATE TABLE IF NOT EXISTS Users (
    //         id SERIAL PRIMARY KEY,
    //         email VARCHAR(50) NOT NULL,
    //          loggedin BOOLEAN NOT NULL
    //     )
    // `

    const checkCookie = async (req,res) => {
        if(req.cookies.id===undefined){
            res.status(500).json("Not allowed")
        }
    }

    router.get('/',(req,res)=>{
        if(req.cookies.id===undefined)
            res.redirect('/login')
        else
            res.redirect(`/user/${req.cookies.id}`)
    })

    router.get('/user/:id',(req,res)=>{
        checkCookie(req,res)
        res.sendFile(path.join(__dirname, '../starter/public', 'home.html'));
    })

    // // for pulling all the task and creating a task
    router.route('/user/:id/tasks')
        .get((req,res)=>{
            try{
                checkCookie(req,res)
                getAllTasks(req,res)
            }catch(err){
                res.status(500),json(err)
            }
        })
        .post((req,res)=>{
            try{
                checkCookie(req,res)
                createTask(req,res)
            }catch(err){
                throw new Error('User doesn\'t exist')
            }
        })

    // for getting, updating and deleting a specific task
    router.route('/user/:id/task/:taskId')
        .get((req,res)=>{
            checkCookie(req,res)
            res.sendFile(path.join(__dirname, '../starter/public', 'task.html'));
            // getTask(req,res)
        })
        .patch((req,res)=>{
            checkCookie(req,res)
            updateTask(req,res) 
        })
        .delete((req,res)=>{
            checkCookie(req,res)
            deleteTask(req,res)
        })

        router.route('/user/:id/get_task/:taskId')
        .get((req,res)=>{
            checkCookie(req,res)
            getTask(req,res)
        })

router.route('/login')
.get(async (req, res) => {
    if(req.cookies.id===undefined)
        res.sendFile(path.join(__dirname, '../starter/public', 'login.html'));
    else
        res.redirect(`/user/${req.cookies.id}`)
})
.post(async (req, res) => {
    try {
        await login(req,res)
    } catch (err) {
        res.status(500).send(err.message);
    }
})

router.post('/logout',async(req,res)=>{
    try{
        checkCookie(req,res)
        await logout(req,res)
    }catch(err){
        res.status(500).send(err.message)
    }
})

router.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, '../starter/public', 'signup.html'));
});

router.post('/signup', body('email').trim().isEmail(), async (req, res) => {
    try {
        const result = validationResult(req);
        if (result.isEmpty()) {
            await signup(req,res)
        }
    } catch (err) {
        res.status(500).send(err.message);
    }
});

module.exports = router


