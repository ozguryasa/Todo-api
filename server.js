var express = require('express');
var app = express();
var PORT = process.env.PORT || 3030;
var todos = [{
        id: 1,
        description: 'Call Mom',
        completed: false
    },
    {
        id: 2,
        description: "Go to Gym",
        completed: false
    },
    {
        id: 3,
        description: "Get a bath :)",
        completed: true
    }

];
app.get('/', function(req, res) {
    res.send("Todo API ROOT");
});
app.get('/todos', function(req, res) {
    res.json(todos);
});
app.get('/todos/:id', function(req, res) {
    var matched;
    var targetID = parseInt(req.params.id, 10);
    todos.forEach(element => {

        if (element.id === targetID) {
            matched = element;

        }

    });

    if (matched) {
        res.json(matched);

    } else {
        console.log("Not found");
        res.status(404).send();


    }



});

app.listen(PORT, function() {
    console.log('Express listening port');
});