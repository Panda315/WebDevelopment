const db = require('./database')   

const signup = async (req,res) =>{
    try{
        user = await db.oneOrNone('SELECT * FROM Users WHERE email=$1',[req.body.email])
        if(user!==null){
            return res.status(400).json({message:'Email already exists'})
        }
        console.log("controllers ko signup")
        console.log(req.body.email)
        const newUser = await db.one('INSERT INTO Users (email, password) VALUES ($1,$2)',[req.body.email,req.body.password])
        console.log(newUser)
        if(newUser){
            res.status(200)
        }
    }catch(err){
        res.json(err)
    }
}

const login = async (req,res) => {
    try{
        console.log("kina na chaleko lol")
        console.log(req.body.email)
        console.log("yo bhanda agadi email print hunu parne")
        const user = await db.oneOrNone('SELECT * FROM Users WHERE email=$1',[req.body.email])
        console.log(user)
        if(user!==null){
            console.log("controller ko login")
            res.redirect(`/user/${user.id}`)
        }
        else
            res.status(400).json({message:'Email doesn\'t exists'})
    }catch(err){
        console.log("error ayo")
        res.json(err)
    }
}

const getAllTasks = async (req,res) => {
    try{
        const tasks = await db.manyOrNone('SELECT * FROM Tasks WHERE user_id=$1',[req.params.id])
        console.log("controllers ko getalltasks")
        res.status(200).json(tasks)
    }catch(err){
        res.status(500).json(err)
    }
}

const createTask = async (req,res) => {
    try{
        const id = await db.oneOrNone(
            'INSERT INTO Tasks(task,user_id) VALUES($1,$2) RETURNING id',[req.body.task,req.params.id]
        )
        console.log('from createTask : ' + id)
        res.status(201).json(id)
    }catch(err){
        res.status(500).json(err)
    }
    console.log('Task created sucessfully')
}

const getTask = async (req,res) => {
    try{
        const task = await db.oneOrNone('SELECT * FROM Tasks WHERE id=$1',[req.params.taskId])
        if(task !== null)
            res.status(200).json(task)
        else    
            res.status(200).send("Task doesn\'t exist")
    }catch(err){
        res.status(500).json(err)   
    }
}

const updateTask = async (req,res) => {
    try{
        const task = await db.oneOrNone('SELECT * FROM Tasks WHERE id=$1',[req.params.taskId])
        if(task === null)
            res.status(500).send("Task doesn\'t exist")
        let updateTask = await db.oneOrNone('UPDATE Tasks SET task=$1,completed=$2 WHERE id = $3',[req.body.task,req.body.completed,req.params.taskId])
        updateTask = await db.oneOrNone('SELECT * FROM Tasks WHERE id=$1',[req.params.taskId])
        if(updateTask !== null)
            res.status(200).json(updateTask)
    }catch(err){
        res.status(500).json(err)
    }
}

const deleteTask = async (req,res) => {
    try{
        const task = await db.oneOrNone('SELECT FROM Tasks WHERE id=$1',[req.params.taskId])
        if(task === null)
            res.status(500).send("Task doesn\'t exist")
        const deletedTask = await db.oneOrNone('DELETE FROM Tasks WHERE id = $1',[req.params.taskId])
        if(deletedTask === null)
            res.status(200).json("Task deleted sucessfully")
    }catch(err){
        res.status(500).json("Task doesn't exist")
    }
}

module.exports = {signup,login,getAllTasks,createTask,getTask,updateTask,deleteTask}