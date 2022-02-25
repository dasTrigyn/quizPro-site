const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Quiz = require('../model/quiz');
const Candidate = require('../model/candidate')
const leaderBoard = require('../model/leaderboard')
const User = require('../model/user')
const bcrypt = require('bcryptjs')


let arr = ["QnId","Question","option1","option2","option3","option4","Answer"];
router.get('/',(req,res)=>{
    console.log('api works');
    
    //res.send('From API route');
    res.render("index",{elements:arr});
})

router.get('/leaderboard', async(req,res)=>{
    let scoreModel = await leaderBoard.find().sort({score : -1});
    console.log("scoreModel",scoreModel)
    if(!scoreModel){
        res.status(500).json({success:false})
    }
    res.send(scoreModel);
})
router.get('/users', async(req,res)=>{
    let userList = await User.find().select('-passwordHash');
    if(!userList){
        res.status(500).json({success:false})
    }
    res.send(userList);
})
router.post('/addCandidate', (req,res)=>{
    let candidates = req.body;
    let newCandidate = new Candidate(candidates);
    newCandidate.save((err, data)=>{
        if(err){
            
            console.log("error in saving",err);
        }
        else{
            console.log("controller",req.body)
            let payload = { subject : data._id}
            let token = jwt.sign(payload,'secretKey',{ expiresIn: '1h' });
            res.status(200).send({token})
            // return res.status(200).send(data )
        }
    })
})
router.post('/register', (req,res)=>{
    let user = req.body;
    let newUser = new User({
        name : req.body.name,
        email : req.body.email,
        phone : req.body.phone,
        passwordHash : bcrypt.hashSync(req.body.password, 10),
        isAdmin : req.body.isAdmin
    });
    newUser.save((err, data)=>{
        if(err){
            
            console.log("error in saving",err);
        }
        else{
            console.log("controller",req.body)
            let payload = { subject : data._id}
            let token = jwt.sign(payload,'secretKey',{ expiresIn: '1h' });
            res.status(200).send({token})
            // return res.status(200).send(data )
        }
    })
})
router.post('/login', async(req,res)=>{
    let user = await User.findOne({email:req.body.email})
    const key = 'secretKey';
    if(!user){
        return res.status(400).send('user not found')
    }

    if(user && bcrypt.compareSync(req.body.password, user.passwordHash)){
        const token = jwt.sign(
            {
                userID : user.id,
                isAdmin : user.isAdmin
            },
            key,
            {
                expiresIn: '2d'
            }
        )

        res.status(200).send({name:user.name,email:user.eamil,token:token})
    }
    else{
        return res.status(400).send('Incorrect Username or password')
    }
})
router.post('/postScore', (req,res)=>{
    let candidateScore = req.body;
    let scoreModel = new leaderBoard(candidateScore);
    scoreModel.save((err, data)=>{
        if(err){
            console.log("score model error in saving",err);
        }
        else{
            console.log("score controller",req.body)
            res.status(200).send({success:true})
            // return res.status(200).send(data )
        }
    })
})
router.post('/addItems', (req,res)=>{
        let quizdata = req.body;
        // let newQuiz = new Quiz({
        //     QnId: req.body.QnId,
        //     Question: req.body.Question,
        //     option1: req.body.option1,
        //     option2: req.body.option2,
        //     option3: req.body.option3,
        //     option4: req.body.option4,
        //     Answer: req.body.Answer,
        // })
        let newQuiz = new Quiz(quizdata)
        newQuiz.save(function(error, data){
            if(error){
                console.log("error in saving",error);
            }
            else{
                console.log("controller",req.body)
                //return res.status(200).send(data )
                
                //return res.send('succesfully added')
                
            }
          });
        
        res.render("index",{ elements:arr })
        
    
})

router.get('/getAllQuestions',async(req,res)=>{
    const data = await Quiz.find();
    res.status(200).send({data})
})
module.exports = router;