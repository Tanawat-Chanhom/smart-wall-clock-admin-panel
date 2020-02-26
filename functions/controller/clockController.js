const express = require('express');
const cors = require('cors');
const clock = express();
const admin = require("../utils/Config");
const firestore = admin.firestore();
const { validateToken } = require('../utils/User');
clock.use(cors({ origin: true }));

clock.get('/items', async (req, res) => {
    try {
        let { authorization } = req.headers;
        let arrayOfClock = [];
        let {userId} = await validateToken(authorization);
        let clockRef = firestore.collection('Clocks');
        let data = await new Promise(async function (resolve) {
            await clockRef.where('userId', '==', userId).get()
                .then(doc => {
                    if (doc.isEmpty) {
                        console.log("No such document!");
                        resolve(false);
                    } else {
                        doc.forEach(doc => {
                            let clockData = doc.data();
                            clockData.firebaseId = doc.id;
                            arrayOfClock.push(clockData)
                        })
                        resolve(arrayOfClock);
                    }
                })
                .catch(err => {
                    console.log('Error getting documents' ,err);
                    resolve(false);
                })
        })
        res.send({
            statusCode: 200,
            message: "Successfully",
            arrayOfClock: data
        })
    } catch (e) {
        res.send({
            statusCode: 500,
            message: "Internal server error",
            error: e
        })
    }
});

clock.post('/newItem', async (req, res) => {
    try {
        let { clockName, clockId } = req.body;
        let { authorization } = req.headers;
        let {userId} = await validateToken(authorization);
        let saveClock = await firestore.collection('Clocks').add({
            clockId: clockId,
            name: clockName,
            timeZone: 'thai',
            battery: 0,
            tem: 0,
            userId: userId
        })
        if (saveClock) {
            res.send({
                statusCode: 200,
                message: "Save successfully",
                clockData: {
                    clockId: clockId,
                    name: clockName,
                    timeZone: 'thai',
                    battery: 0,
                    tem: 0,
                    firebaseId: saveClock.id
                }
            })
        } else {
            res.send({
                statusCode: 400,
                message: "Save fail"
            })
        }
    } catch (e) {
        res.send({
            statusCode: 500,
            message: "Internal server error",
            error: e
        })
    }
});

clock.put('/item/:firebaseId', async (req, res) => {
    try {
        let { clockName, timeZone } = req.body;
        let { firebaseId } = req.params;
        let clockRef = await firestore.collection('Clocks').doc(firebaseId);
        let updateClock = await clockRef.update({
            name: clockName,
            timeZone: timeZone
        })
        if (updateClock) {
            res.send({
                statusCode: 200,
                message: "Save successfully"
            })
        } else {
            res.send({
                statusCode: 400,
                message: "Save fail"
            })
        }
    } catch (e) {
        res.send({
            statusCode: 500,
            message: "Internal server error",
            error: e
        })
    }
});

clock.delete('/item/:firebaseId', async (req, res) => {
    try {
        let { firebaseId } = req.params;
        let clockRef = await firestore.collection('Clocks').doc(firebaseId);
        let delClock = await clockRef.delete();
        if (delClock) {
            res.send({
                statusCode: 200,
                message: "Delete successfully"
            })
        } else {
            res.send({
                statusCode: 400,
                message: "Delete fail"
            })
        }
    } catch (e) {
        res.send({
            statusCode: 500,
            message: "Internal server error",
            error: e
        })
    }
});

module.exports = clock;