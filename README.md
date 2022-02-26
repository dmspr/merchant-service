# merchant-service
2nd Mini Project from dibimbing.id 

# Description 
The 2nd Mini project from dibimbing course in the form Backend API Server Development, whom uses [nodejs](https://nodejs.org/en/) - [expressjs](https://www.npmjs.com/package/express) as the backend framework and MySQL as the database. this Mini Project based on Backend Server Development Mini Project Documentation

# Getting Started
- Go to http://nodejs.org, and click the Install button. Run the installer that you just downloaded
- `npm install` to install all required dependencies on your terminal in root project directory
- `npm init` This command serves as a tool to create a `package.json` file for the project being executed 

# Installation

Run these on your terminal in root project directory:
- `npm install express` 
- `npm install mysql`
- `npm install jsonwebtoken`
- `npm install validatorjs`

# Database Configuration

This is how to setup the database configuration.

- Open **./config/db.js** and you will see the followng code:

```javascript
var mysql = require('mysql');
var db = mysql.createConnection({
  host: "MySQL_host", // "localhost" by default
  user: "MYSQL_user", // "root" by default
  password: "Your MySQL password", //null is default
  database: "merchant-service",
});

module.exports = db;
```

- Change the value of **host**, **user**, **password**, and **port** to your MySQL configuration.

# Run The App

- In the root directory terminal you can run `npm start`.
- The server uses port: `3000` and it will be running on [http://localhost:3000](http://localhost:3000). You can change your port in **./app.js**

# API Usage

This project use 2 groups, merchant and product. To create tables in your local database, you should run `node .\mysql\create.js`

### Merchant

<summary><b>Register Merchant</b></summary>

<p>

`POST` `/register`

_Parameters:_ body

- `password` string, min:6 \*required
- `name` string, min:3, max:50 \*required
- `address` string \*required
- `phone_number` integer \*required

_Response:_ JSON

- `status: 200` registration success

```json
{
  "message": "Merchant registered successfully."
}
```

- `status: 400` username confirmation

```json
{
  "message": "The username must be at least 3 characters."
}
```

- `status: 400` username confirmation

```json
{
  "message": "The username may not be greater than 50 characters."
}
```


- `status: 400` password confirmation

```json
{
  "message": "The password must be at least 6 characters."
}
```


- `status: 400` password confirmation doesn't match

```json
{
  "message": "password confirmation does not match."
}
```

- `status: 400` parameters validation failed

```json
{
    "message": "Error on: ",
    "data": {
        "param_key": [
            "error message array."
        ]
    }
}
```

</p>

<p>---------------------------------------------------------------------</p>

<summary><b>Merchant Login</b></summary>

<p>

`POST` `/login`

_Parameters:_ body

- `username` string \*required
- `password` string, min:6 \*required

_Response:_ JSON

- `status: 200` login success

```json
{
  "message": "Login success.",
  "token": "token"
}
```

- `status: 400` login failed

```json
{
  "message": "Username or password is invalid"
}
```

</p>

<p>---------------------------------------------------------------------</p>

<summary><b>Delete merchant</b></summary>

<p>

`PUT` `/merchant/softdelete/:id`

Deleting merchant using softdelete method.

_Authorization:_ Bearer Token

- `token` token from login response \*required

_Parameters:_

  `id` (merchant id) integer \*required

_Response:_ JSON

- `status: 200` delete success

```json
{
  "message": "Merchant has been deleted."
}
```

- `status: 401` unauthorized

```json
{
  "message": "Unauthorized"
}
```

- `status: 400` wrong authorization format

```json
{
  "auth": false,
  "message": "Wrong authorization format"
}
```

- `status: 401` token expired

```json
{
  "auth": false,
  "message": "Token expired"
}
```

- `status: 401` authorization failed

```json
{
  "auth": false,
  "message": "Invalid Token"
}
```

<p>---------------------------------------------------------------------</p>

<summary><b>Delete merchant</b></summary>

<p>

`DELETE` `/merchant/delete/:id`

Deleting merchant using harddelete method.

_Authorization:_ Bearer Token

- `token` token from login response \*required

_Parameters:_

  `id` (merchant id) integer \*required

_Response:_ JSON

- `status: 200` delete success

```json
{
  "message": "Merchant has been deleted."
}
```

- `status: 401` unauthorized

```json
{
  "message": "Unauthorized"
}
```

- `status: 400` wrong authorization format

```json
{
  "auth": false,
  "message": "Wrong authorization format"
}
```

- `status: 401` token expired

```json
{
  "auth": false,
  "message": "Token expired"
}
```

- `status: 401` authorization failed

```json
{
  "auth": false,
  "message": "Invalid Token"
}
```
</p>

<p>---------------------------------------------------------------------</p>

### Product

<summary><b>Add products</b></summary>

<p>

`POST` `/product`

_Authorization:_ Bearer Token

- `token` token from login response \*required

_Parameters:_ 
- path

  `id` (merchant id) integer \*required

- body

  - `name` string, min:3, max:50 \*required
  - `quantity` integer, min:1 \*required
  - `price` integer, min:10000 \*required

_Response:_ JSON

- `status: 200` add product success

```json
{
  "message": "Product has been inserted."
}
```

- `status: 400` parameters validation failed

```json
{
  "message": {
    "param_key": ["error message array"]
  }
}
```

- `status: 401` unauthorized

```json
{
  "message": "Unauthorized"
}
```

- `status: 400` wrong authorization format

```json
{
  "auth": false,
  "message": "Wrong authorization format"
}
```

- `status: 401` token expired

```json
{
  "auth": false,
  "message": "Token expired"
}
```

- `status: 401` authorization failed

```json
{
  "auth": false,
  "message": "Invalid Token"
}
```

</p>

<p>---------------------------------------------------------------------</p>


<summary><b>Get list of product</b></summary>

<p>

`GET` `/product/:username`

_Authorization:_ Bearer Token

- `token` token from login response \*required

_Parameters:_ path

- `username` (username merchant) string \*required

_Response:_ JSON

- `status: 200` Get data success

```json
{
    "message": `Product ${username} is found`,
    "data": [
        {
            "name": "string",
            "quantity": "integer",
            "price": "integer"
        }
    ]
}
```

- `status: 401` unauthorized

```json
{
  "message": "Unauthorized"
}
```

- `status: 400` wrong authorization format

```json
{
  "auth": false,
  "message": "Wrong authorization format"
}
```

- `status: 401` token expired

```json
{
  "auth": false,
  "message": "Token expired"
}
```

- `status: 401` authorization failed

```json
{
  "auth": false,
  "message": "Invalid Token"
}
```

</p>

<p>---------------------------------------------------------------------</p>

<summary><b>Update product</b></summary>

<p>

`PUT` `/product/:id `

_Authorization:_ Bearer Token

- `token` token from login response \*required

_Parameters:_ 
- path

  `id` (product id) integer \*required

- body

  - `name` string, min:3, max:50 \*required
  - `quantity` integer, min:1 \*required
  - `price` integer, min:10000 \*required

_Response:_ JSON

- `status: 200` update product success

```json
{
  "message": "Product has been updated."
}
```

- `status: 401` unauthorized

```json
{
  "message": "Unauthorized"
}
```

- `status: 400` wrong authorization format

```json
{
  "auth": false,
  "message": "Wrong authorization format"
}
```

- `status: 401` token expired

```json
{
  "auth": false,
  "message": "Token expired"
}
```

- `status: 401` authorization failed

```json
{
  "auth": false,
  "message": "Invalid Token"
}
```

</p>

<p>---------------------------------------------------------------------</p>

<summary><b>Soft Delete product</b></summary>

<p>

`DELETE` `/product/softdelete/:id`

_Authorization:_ Bearer Token

- `token` token from login response \*required

_Parameters:_ path

- `id` (product id) integer \*required

_Response:_ JSON

- `status: 200` delete product success

```json
{
  "message": "Product has been deleted."
}
```

- `status: 401` unauthorized

```json
{
  "message": "Unauthorized"
}
```

- `status: 400` wrong authorization format

```json
{
  "auth": false,
  "message": "Wrong authorization format"
}
```

- `status: 401` token expired

```json
{
  "auth": false,
  "message": "Token expired"
}
```

- `status: 401` authorization failed

```json
{
  "auth": false,
  "message": "Invalid Token"
}
```

</p>
<p>---------------------------------------------------------------------</p>

<summary><b>Delete product</b></summary>

<p>

`DELETE` `/product/delete/:id`

_Authorization:_ Bearer Token

- `token` token from login response \*required

_Parameters:_ path

- `id` (product id) integer \*required

_Response:_ JSON

- `status: 200` delete product success

```json
{
  "message": "Product has been deleted."
}
```

- `status: 401` unauthorized

```json
{
  "message": "Unauthorized"
}
```

- `status: 400` wrong authorization format

```json
{
  "auth": false,
  "message": "Wrong authorization format"
}
```

- `status: 401` token expired

```json
{
  "auth": false,
  "message": "Token expired"
}
```

- `status: 401` authorization failed

```json
{
  "auth": false,
  "message": "Invalid Token"
}
```

To see the response you can do API testing using an application like [Postman](https://www.postman.com/).
If you have inserted the dummy datas you can use dummy merchant for login with phone number **081235971089** and password **qwerty12345**.
You can also import this project's postman_collection at **./postman_collection/merchant-service.postman_collection.json** to your [Postman](https://www.postman.com/).

I hope you guys like this project and ENJOY!!! :grin:
