var inquirer = require('inquirer');

var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    port: 3307,
    user: 'root',
    password: 'password',
    database: 'bamazon'
});

connection.connect();




connection.query('SELECT * FROM products', function (error, results) {
    if (error) throw error;
    console.table(results);
    promtUser()
});


function promtUser() {
    inquirer
        .prompt([
            /* Pass your questions in here */
            {
                name: "id",
                type: "input",
                message: "What is the item you are searching for?",
            },
            {
                name: "quantity",
                type: "input",
                message: "how many of the item do you need?"

            }
        ])
        .then(answers => {
            // Use user feedback for... whatever!!
            console.log(answers)
            connection.query('SELECT * FROM products where item_id = ?', [answers.id], function (error, results) {
                if (error) throw error;
                console.table(results);
                
            });
        })
        .catch(error => {
            console.log(error)
        });
}