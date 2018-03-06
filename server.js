var express = require('express');
var bodyParser = require('body-parser');
var _ = require("underscore");
var app = express();
var PORT = process.env.PORT || 3030;
var todos = [];
var todoNextId = 1;
var db = require("./db.js");

app.use(bodyParser.json());
app.get('/', function(req, res) {
    res.send("Todo API ROOT");
});
app.get('/todos', function(req, res) {

    res.json(todos);
});
app.get('/todos/:id', function(req, res) {

    var targetID = parseInt(req.params.id, 10);
    var matched = _.findWhere(todos, { id: targetID });

    if (matched) {
        res.json(matched);

    } else {
        console.log("Not found");
        res.status(404).send();
    }
});

app.post('/todos', function(req, res) {
    var body = _.pick(req.body, 'description', 'completed');
    db.todo.create(body).then(function(todo) {
        res.json(todo.toJSON());
    }, function(e) {
        res.status(400).json(e);
    });


    /*body.id = todoNextId++;
    todos.push(body);
    res.json(body);*/




});
db.sequelize.sync().then(function() {
    app.listen(PORT, function() {
        console.log('Express listening port');
    });
});