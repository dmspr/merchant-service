const e = require('express');
const db = require('../../config/db')

function insertMerchant(req, res) {
    let data = [req.body.username, req.body.password, req.body.address, req.body.phone_number]

    let insertQuery = `INSERT INTO merchant (username, password, address, phone_number) VALUES (?,?,?,?);`

    db.query(insertQuery, data, function (error, results, fields) {
        if (error) throw error

    });

    res.send({ message: 'Merchant registered successfully' })
}

function softDeleteMerchant(req, res) {
    let softDeleteQuery = `update merchant set updatedAt = CURRENT_TIMESTAMP(), is_deleted = TRUE WHERE id = ?`
    let data = [req.params.id, req.body.password]
    db.query(softDeleteQuery, data, function (err, deleted) {
        if (err) throw err;
    });
    res.send({ massage: 'Merchant has been soft deleted' })
}


function deleteMerchant(req, res) {
    let deleteQuery = `DELETE FROM merchant WHERE id = ?`
    let data = [req.params.id]
    db.query(deleteQuery, data, function (err, deleted) {
        if (err) throw err;
    });

    res.send({ message: 'Merchant has been deleted' })
}

module.exports = {
    insertMerchant,
    deleteMerchant,
    softDeleteMerchant,
}