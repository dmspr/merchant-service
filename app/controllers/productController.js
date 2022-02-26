const db = require('../../config/db')

function insertProduct(req, res) {
    let data = req.body

    let insertQuery = `INSERT INTO product (name, quantity, price, merchant_id) VALUES (?);`
    db.query(insertQuery, [[data.name, data.quantity, data.price, data.merchant_id]], function (error, results, fields) {
        if (error) throw error;
    });

    res.send({ message: 'Product has been inserted' })
}
function listProduct(req, res) {
    let selectQuery = `SELECT name, quantity, price FROM product JOIN merchant on product.merchant_id = merchant.id WHERE username = ? `
    let data = [req.params.username]
    db.query(selectQuery, data, function (error, results, fields) {
        if (error) throw error;
        res.send({ message: `Product ${req.params.username} is found`, data: results })
    });
}

function softDeleteProduct(req, res) {
    let deleteQuery = `update product set updatedAt = CURRENT_TIMESTAMP(), is_deleted = TRUE WHERE id = ?`
    let data = [req.params.id]
    db.query(deleteQuery, data, function (err, deleted) {
        if (err) throw err;
    });

    res.send({ message: 'Product has been soft deleted' })
}

function deleteProduct(req, res) {
    let deleteQuery = `DELETE FROM product WHERE id = ?`
    let data = [req.params.id]
    db.query(deleteQuery, data, function (err, deleted) {
        if (err) throw err;
    });

    res.send({ message: 'Product has been deleted' })
}

function updateProduct(req, res) {
    let updateQuery = `UPDATE product SET name = ?, quantity = ?, price = ?, updatedAt = CURRENT_TIMESTAMP() WHERE id = ?`

    let data = [req.body.name, req.body.quantity, req.body.price, req.params.id]
    db.query(updateQuery, data, function (error, result, fields) {
        if (error) throw error;
    });

    res.send({ message: 'Product has been updated', data: req.body })
}

module.exports = {
    insertProduct,
    listProduct,
    deleteProduct,
    updateProduct,
    softDeleteProduct
}