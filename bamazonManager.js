let inquirer = require("inquirer");
let mysql = require("mysql");

let connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'password',
	database: 'bamazon'
});

inquirer.prompt([{
	name: "Actions",
	message: "Choose an option: ",
	type: "list",
	choices: ["View products for sale", "View low inventory", "Add to inventory", "Add new product"]
}]).then(answer => {

	if (answer.Actions === "View products for sale") {
		showItems();
	}

	if (answer.Actions === "View low inventory") {

		console.log("Accessing database...");
		connection.connect();

		connection.query('SELECT * FROM bamazon.products WHERE stock_quantity < 5', function(error, results, fields) {
			if (error) throw error;
			for (i = 0; i < results.length; i++) {
				console.log("ID #: " + results[i].item_id + " Item: " + results[i].product_name + " Department: " + results[i].department_name + " Price: " + results[i].price + " Quantity: " + results[i].stock_quantity);
			}

		});
	}

	if (answer.Actions === "Add to inventory") {
		console.log("Accessing database...");

		inquirer.prompt([{
				name: "ID",
				message: "Please input the ID of the item you would like to add more of: ",
				type: "input"
			},
			{
				name: "Quantity",
				message: "How many would you like to add?",
				type: "input"
			}

		]).then(addAnswer => {

			console.log("Accessing database...");

			connection.connect();
			connection.query('SELECT * FROM bamazon.products WHERE item_id = ?', [addAnswer.ID], function(error, results, fields) {
				if (error) throw error;
				addI(addAnswer.ID, addAnswer.Quantity, results[0].stock_quantity);


			});
		})
	}

	if (answer.Actions === "Add new product") {

		inquirer.prompt([{
				message: "What item would you like to add?",
				name: "Item",
				type: "input"
			},
			{
				message: "Which department?",
				name: "Department",
				type: "input"
			},
			{
				message: "At what price?",
				name: "Price",
				type: "input"
			},
			{
				message: "How many?",
				name: "Quantity",
				type: "Input"
			}
		]).then(inputs => {

			connection.query('INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES (?, ?, ?, ?)', [inputs.Item, inputs.Department, inputs.Price, inputs.Quantity], function(error, results, fields) {
				if (error) throw error;

			})
			console.log("Item added!");

			showItems();
		});

	}
})

function showItems() {

	console.log("Accessing database...");


	connection.query('SELECT * FROM bamazon.products', function(error, results) {
		if (error) throw error;
		for (i = 0; i < results.length; i++) {
			console.log("ID #: " + results[i].item_id + " Item: " + results[i].product_name + " Department: " + results[i].department_name + " Price: " + results[i].price + " Quantity: " + results[i].stock_quantity);
		}

	});
}

function addI(id, q, sq) {

	connection.query("UPDATE products SET stock_quantity = ? WHERE item_id = ?", [+q + +sq, id], function(error, item, fields) {
		if (error) throw error;

		console.log("Quantity updated!");

showItems();
	});

}
