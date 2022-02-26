const db = require('../../config/db')
const jwt = require('jsonwebtoken')

function login(req, res) {
    let param = [req.body.username, req.body.password]
    let selectQuery = `SELECT * FROM merchant WHERE username = ? and password = ?`

    db.query(selectQuery, param, function (error, results, fields) {
        if (error) throw error;
        if(results.length < 1) {
            return res.status(400).send({ message: 'Username or password is invalid'})
        }

        // insformation about user saved to payload
        const payload = {
            id: results.id,
            name: results.name,
        }
        const token = jwt.sign(payload, 'secret', {expiresIn: '7d'})

        return res.send({ message: 'Login Succesfully', data: { token: token }})
    })
}

module.exports = {
    login
}