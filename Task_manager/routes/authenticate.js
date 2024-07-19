// const express = require('express')
// const router = express.Router()
// const {body} = require('express-validator')
// const path = require('path')

// router.get('',(req,res)=>{
//     res.sendFile(path.join(__dirname,'../starter/public', 'login.html'))
// })

// router.get('/login', (req, res) => {
//     res.sendFile(path.join(__dirname, '../starter/public', 'login.html'));
// });

// router.post('/login',(req,res)=>{
//     try{
//         login(req,res)
//     }catch(err){
//         res.send(err)
//     }
// })

// router.get('/signup', (req, res) => {
//     console.log('authenticate ko signup bata')
//     res.sendFile(path.join(__dirname, '../starter/public', 'signup.html'));
// });

// router.post('/signup',body('email').trim().isEmail(),(req,res)=>{
//     try{
//         const result = validationResult(req)
//         if(result.isEmpty())
//             signup(req,res)
//     }catch(err){
//         res.send(err)
//     }
// })


// module.exports = router

const express = require('express')
const router = express.Router()
const { body, validationResult } = require('express-validator');
const path = require('path');
const db = require('../controllers/database');
const { signup,login } = require('../controllers/tasks');

// router.get('/', (req, res) => {
//     console.log('authenticate ko base url')
//     res.sendFile(path.join(__dirname, '../starter/public', 'login.html'));
// });

console.log("authenticate")
router.route('/login')
.get((req, res) => {
    console.log('authenticate ko login')
    res.sendFile(path.join(__dirname, '../starter/public', 'login.html'));
})
.post(async (req, res) => {
    try {
        await login()
    } catch (err) {
        res.status(500).send(err.message);
    }
})



// router.get('/login', (req, res) => {
//     console.log('authenticate ko login')
//     res.sendFile(path.join(__dirname, '../starter/public', 'login.html'));
// });

// router.post('/login', async (req, res) => {
//     try {
//         await login()
//     } catch (err) {
//         res.status(500).send(err.message);
//     }
// });

router.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, '../starter/public', 'signup.html'));
});

router.post('/signup', body('email').trim().isEmail(), async (req, res) => {
    try {
        const result = validationResult(req);
        if (!result.isEmpty()) {
            await signup()
        }
    } catch (err) {
        res.status(500).send(err.message);
    }
});

module.exports = router;
