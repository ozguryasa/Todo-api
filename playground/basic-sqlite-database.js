var Sequelize = require('sequelize');
var sequelize = new Sequelize(undefined, undefined, undefined, {
    'dialect': 'sqlite',
    'storage': __dirname + '/basic-sqlite-database.sqlite'
});
var Todo = sequelize.define('todo', {
    description: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            len: [1]

        }
    },
    completed: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
})
sequelize.sync().then(function() {
    console.log("Everything is synchned");
    Todo.create({
        description: 'Takeout trash '

    }).then(function(todo) {
        return Todo.create({
            description: 'Clean office'
        });
    }).then(function() {
        //return Todo.findById(4)
        return Todo.findAll({
            where: {
                description: {
                    $like: '%office%'
                }
            }
        });
    }).then(function(todos) {
        if (todos) {
            todos.forEach(element => {
                console.log(element.toJSON());
            });

        } else
            console.log('no todo found');
    }).catch(function(e) {
        console.log(e);

    })
});