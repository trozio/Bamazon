CREATE DATABASE bamazon;
USE bamazon;
CREATE TABLE products(
	item_id INT(10) NOT NULL AUTO_INCREMENT,
	product_name VARCHAR(255) NULL,
	department_name VARCHAR(255) NULL,
	price INT(10) NULL,
	stock_quantity INT(10) NULL,
    PRIMARY KEY(item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Phone charger", "Electronics", 20, 4);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("iPhone XS", "Electronics", 900, 8);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Alarm clock", "Electronics", 15, 6);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Jacket", "Clothing", 50, 3);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("VANS shoes", "Clothing", 90, 2);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Wine glasses", "Kitchenware", 40, 4);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Pencils", "Office supplies", 5, 20);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("TV", "Electronics", 2000, 1);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Dog food", "Pet supplies", 15, 2);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Hot Wheels", "Toys", 2, 5);
