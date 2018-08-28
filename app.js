//Init main server modules
const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// init body parser
app.use(bodyParser.json());
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
            res.json(todoItems);
        }
    });

});

//get single list item router
app.get('/getListItem/:id',(req,res)=>
{

    todoItem.findOne({_id:req.params.id}).exec((err,todoItem) =>
    {
        if(err)
        {
            res.send('Could not find item');
        }
        else
        {
            res.json(todoItem);
        }
    });

});

//delete todoItem
app.delete("/deleteItem", (req,res) =>
{
    todoItem.deleteOne({ title: req.body.title, description: req.body.description}, (err,deletedItem) =>
    {
        if(err)
        {
            res.send('Could not delete item');
        }
        else
        {
            res.json(deletedItem);
        }

    });
});

//post todoItem
app.post('/addItem', (req,res)=>{

    let newToDoItem = new todoItem();
    newToDoItem.title = req.body.title;
    newToDoItem.description = req.body.description;

    newToDoItem.save((err,todoItem) =>{

        if(err)
        {
            res.send('error saving Item');
        }
        else
        {
            res.json(todoItem);
        }
    });

});







