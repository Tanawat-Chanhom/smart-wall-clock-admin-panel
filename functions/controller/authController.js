const express = require('express');
const cors = require('cors');
const auth = express();
const admin = require("../utils/Config");
const firestore = admin.firestore();
const { login, logout } = require('../utils/User');
auth.use(cors({ origin: true }));

auth.post('/login', async (req, res) => {
    try {
        let {username, password} = req.body;
        let token = await login(username, password);
        if (token.status) {
            res.send({
                statusCode: 200,
                message: "Login successfully",
                token: token.token
            });
        } else {
            res.send({
                statusCode: 400,
                message: token.message
            });
        }
    } catch (e) {
        res.send({
            statusCode: 500,
            message: "Internal server error",
            error: e
        })
    }
});

module.exports = auth;