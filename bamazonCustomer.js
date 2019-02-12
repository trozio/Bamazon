let mysql = require("mysql");
let inquirer = require("inquirer");

let connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'password',
	database: 'bamazon'
});
sql();
prompt();

function prompt() {
	inquirer.prompt([{
			name: "ID",
			message: "Please input the ID of the product they would like to buy:",
			type: "input"
		},
		{
			name: "Quantity",
			message: "How many units of the product would you would like to buy?",
			type: "input"
		}
	]).then(answer => {
		if (!answer.ID || !answer.Quantity) {
			console.log("Incorrect Input!");
			return;

		}
		inquiry(answer.ID, answer.Quantity);
	});
}

function sql() {
	console.log("Accessing database...");
	connection.connect();

	connection.query('SELECT * FROM bamazon.products', function(error, results, fields) {
		if (error) throw error;
		for (i = 0; i < results.length; i++) {
			console.log("ID #: " + results[i].item_id + " Item: " + results[i].product_name + " Department: " + results[i].department_name + " Price: " + results[i].price + " Quantity: " + results[i].stock_quantity);
		}

	});
}



function inquiry(id, q) {
	connection.query('SELECT * FROM bamazon.products', function(error, item, fields) {
		if (error) throw error;
		if (q > item[0].stock_quantity) {
			console.log("Insufficient quantity!");
			return;

		}
		console.log("Proccessing transaction...");
		connection.query("UPDATE products SET stock_quantity = ? WHERE item_id = ?", [item[0].stock_quantity -= q, id], function(error, newQ){
		console.log("Success!");
		});

	});



		showItem(id);


	};


	function showItem(newId){
		connection.query('SELECT * FROM bamazon.products WHERE item_id = ?', [newId], function(error, newItem) {
			if (error) throw error;

	console.log("ID #: " + newItem[0].item_id + " Item: " + newItem[0].product_name + " Department: " + newItem[0].department_name + " Price: " + newItem[0].price + " Quantity: " + newItem[0].stock_quantity);

		});
connection.end();
	}
