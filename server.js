const express = require('express');
const db = require('./db');
const path = require('path');


const swig = require('swig');
swig.setDefaults({cache: false});

const app = express();
app.set('view engine', 'html');
app.engine('html', swig.renderFile);
app.use('/vendor', express.static(path.join(__dirname, 'node_modules')));

db.seed()
    .then( ()=>console.log('seeded from server.js'));

app.get('/', (req, res, next)=>{
        Promise.all([
        db.User.findAll(),
        db.User.findAll()
        .then(result => 
            result.reduce(
                function(memo,user) {
                    var first = user.last_name.slice(0,1);
                    memo[first] = typeof memo[first] !== 'undefined' ? memo[first] : 0;
                    memo[first]++;
                    return memo;
                }, 
                {}
            )
        )
        .then(memo =>
            Object.keys(memo).map(key => { return {letter: key, count: memo[key]} })
        )
        .then(myArr => 
            myArr.sort(function(a,b){
                if(a.letter > b.letter){
                    return 1;
                } else{
                    return -1;
                }
            })
        )
    ])
    .then( result => {console.log(JSON.stringify(result,null,'  '));return result;})
    .then( result => res.render('index', {users: result[0], letters: result[1]}))
    .catch(next);

});

app.get('/users/filter/:letter', (req, res, next)=>{
        var myLetter = req.params.letter;
        console.log("myLetter", myLetter);
        //var myArr = [];
        Promise.all([
        db.User.findAll()
        .then(result=>
            result.filter(user=>user.last_name[0]==myLetter)
        ),
        db.User.findAll()
        .then(result => 
            result.reduce(
                function(memo,user) {
                    var first = user.last_name.slice(0,1);
                    memo[first] = typeof memo[first] !== 'undefined' ? memo[first] : 0;
                    memo[first]++;
                    return memo;
                }, 
                {}
            )
        )
        .then(memo =>
            Object.keys(memo).map(key => { return {letter: key, count: memo[key]} })
        )
        .then(myArr => 
            myArr.sort(function(a,b){
                if(a.letter > b.letter){
                    return 1;
                } else{
                    return -1;
                }
            })
        )
    ])
    .then( result => {console.log(JSON.stringify(result,null,'  '));return result;})
    .then( result => res.render('index', {users: result[0], letters: result[1]}))
    .catch(next);
});

const port = process.env.PORT || 3000;
app.listen(port, ()=> console.log(`listening on port ${port}`));