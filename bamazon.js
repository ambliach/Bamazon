var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  start();
});

function start() {
  inquirer
    .prompt([
        {
            name: "idNumber",
            type: "input",
            message: "What is the item ID?"
          },
          {
            name: "buy",
            type: "input",
            message: "how many would you like to purchase?"
          },
    ]).then(function(answer) {
     checkdatabase(answer.idNumber, answer.buy)  
    });
}
//function to change stock quantity and return error (need to fix bugs)
function checkdatabase (idNumber, quantity){
    connection.query("SELECT * FROM products WHERE item_id = '" + idNumber + "'",  
     
    
     function(err, res){
         if (err){
             console.log(err)
         };
    if (quantity <= res[0].stock_quantity){
      console.log("you owe" + res[0].price * quantity );
      connection.query("UPDATE products SET stock_quantity = stock_quantity - " + quantity + "WHERE item_id = '" + idNumber + "'")
    }
    else{
      console.log("Not enough products! try entering a lower number")
    };
  });
};

