


//Init main server modules
const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

//init body parser
app.use(bodyParser.json);
app.use(bodyParser.urlencoded({
    extended:true
}));

//init mongoose todoItems DB
const todoItem = require('./todoItem.model.js');
let db = "mongodb://localhost/todo";
mongoose.connect(db);


//set socket port to 3000
http.listen(3000,  () => {
    console.log('listening on localhost:3000');
});



//default directory router
app.get('/', (req, res) =>{
    res.sendFile(__dirname + '/index.html');
});

//get whole list router
app.get('/getList',(req,res)=>
{
    console.log("getting list");

    todoItem.find({}).exec((err,todoItems) =>
    {
        if(err) {
            res.send('error has occured');
        }
        else
        {
            console.log(todoItems);
            res.json(todoItems);
        }
    });

});

//get single list item router
app.get('/getListItem/:id',(req,res)=>
{
    console.log("getting list item");

    todoItem.findOne({_id:req.params.id}).exec((err,todoItem) =>
    {
        if(err) {
            res.send('error has occured');
        }
        else
        {
            console.log(todoItem);
            res.json(todoItem);
        }
    });

});

//remove todoItem


//post todoItem
app.post('/addItem', (req,res)=>{

    console.log("working");

    let newToDoItem = new todoItem();

    newToDoItem.title = req.body.title;
    newToDoItem.description = req.body.description;

    newToDoItem.save((err,todoItem) =>{

        if(err)
        {
            res.send('error saving todoList Item');
        }
        else
        {
            console.log(todoItem);
            res.send(todoItem);
        }


    });



});


//Handle socket connection
io.on('connection',  (socket) => {


});






