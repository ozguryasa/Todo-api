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
    var query = req.query;
    console.log("cagrildi " + query);
    var where = {};
    if (query.hasOwnProperty('completed') && query.completed === 'true') {
        where.completed = true;
    } else if (query.hasOwnProperty('completed') && query.completed === 'false')
        where.completed = false;

    if (query.hasOwnProperty('q') && query.q.length > 0) {
        where.description = {
            $like: '%' + query.q + '%'
        };
    }
    console.log("where " + where);
    db.todo.findAll({ where: where }).then(function(todos) {
            console.log("todos " + todos);
            res.json(todos);
        }, function(e) {
            res.status(500).send();
        })
        //res.json(todos);
});
app.get('/todos/:id', function(req, res) {

    var targetID = parseInt(req.params.id, 10);
    db.todo.findById(targetID).then(function(todo) {
        if (!!todo) {
            res.json(todo.toJSON());
        } else {
            res.status(400).json(e);
        }

    }, function(e) {
        res.status(500).json(e);
    });
    /*
    var matched = _.findWhere(todos, { id: targetID });

    if (matched) {
        res.json(matched);

    } else {
        console.log("Not found");
        res.status(404).send();
    }*/
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
app.post('/users', function(req, res) {
    var body = _.pick(req.body, 'email', 'password');
    db.user.create(body).then(function(user) {
        res.json(user.toJSON());
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