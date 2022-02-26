const db = require('../config/db')

let createQuery = `
CREATE TABLE merchant (
	id int NOT NULL AUTO_INCREMENT,
	username VARCHAR(50) NOT NULL UNIQUE,
	password VARCHAR(255) NOT NULL,
	address VARCHAR(255) NOT NULL,
	phone_number bigint,
	join_date datetime NOT NULL DEFAULT CURRENT_TIMESTAMP(),
	updatedAt datetime,
	is_deleted boolean default false,
	primary key (id),
	CHECK (LENGTH(password) > 5),
	CHECK (LENGTH(username) > 2 )
	)
COLLATE='utf8mb4_general_ci'
;
`
let createQueryProduct = `
CREATE TABLE PRODUCT (
	id int NOT NULL AUTO_INCREMENT,
	name varchar(50) NOT NULL,
	quantity int NOT NULL,
	price int NOT NULL,
	createAt datetime NOT NULL DEFAULT CURRENT_TIMESTAMP(),
	updatedAt datetime,
	is_deleted boolean default false,
	merchant_id int NOT NULL,
	primary key (id),
	foreign key (merchant_id) references merchant(id),
	CHECK (LENGTH(name) > 2),
	CHECK (quantity > 0),
	CHECK (price > 9999)
	)
COLLATE='utf8mb4_general_ci'
;
`

db.query([createQueryProduct, createQuery], function (error, results, fields) {
	if (error) throw error;
	console.log('Table has been created');
});
