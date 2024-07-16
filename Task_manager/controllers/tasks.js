const db = require('../controllers/database')   


const getAllTasks = async (req,res) => {
    try{
        const tasks = await db.manyOrNone('SELECT * FROM Tasks WHERE User_id=$1',[req.params.id])
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
        const task = await db.oneOrNone('SELECT FROM Tasks WHERE id=$1',[req.params.taskId])
        if(task === null)
            res.status(500).send("Task doesn\'t exist")
        const updateTask = await db.oneOrNone('UPDATE Tasks SET task=$1,completed=$2 WHERE id = $3',[req.body.task,req.body.completed,req.params.taskId])
        if(updateTask === null)
            res.status(200).json("Task updated sucessfully")
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

module.exports = {getAllTasks,createTask,getTask,updateTask,deleteTask}