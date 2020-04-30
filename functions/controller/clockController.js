const express = require('express');
const cors = require('cors');
const clock = express();
const admin = require("../utils/Config");
const { validateToken } = require('../utils/User');
clock.use(cors({ origin: true }));

clock.get('/items', async (req, res) => {
    try {
        let { authorization } = req.headers;
        let {userId} = await validateToken(authorization);
        if (userId) {
            let data_ = [];
            let clocksRef = admin.database().ref('/Clocks')
            let arrayOfClocks = await new Promise(async (resolve) => {
                await clocksRef.once("value")
                    .then(snap => {
                        snap.forEach(data => {
                            if (data.val().userId == userId) {
                                let clockData = data.val()
                                clockData.firebaseId = data.key
                                data_.push(clockData)
                            }
                        })
                        resolve(data_)
                    }).catch(error => {
                        console.log('Error getting documents' ,error);
                        resolve(false);
                    })
            })

            if (arrayOfClocks) {
                res.send({
                    statusCode: 200,
                    message: "Successfully",
                    arrayOfClock: arrayOfClocks
                })
            } else {
                res.send({
                    statusCode: 400,
                    message: "Fail"
                })
            }
        } else {
            res.send({
                statusCode: 401,
                message: "Authorization fail"
            })
        }
    } catch (e) {
        res.send({
            statusCode: 500,
            message: "Internal server error",
            error: e.toString()
        })
    }
});

clock.post('/newItem', async (req, res) => {
    try {
        let { clockName, clockId } = req.body;
        let { authorization } = req.headers;
        let {userId} = await validateToken(authorization);
        if (userId) {
            let dataTemplate = {
                "clockName": clockName,
                "timeZone": "Thai",
                "roomTemperature": 0,
                "clockBattery": 0,
                "clockId": clockId,
                "userId": userId,
                "clockStatus": 'Device OFF',
                "clockFunction": 0
            };

            let ref = admin.database().ref('/Clocks/'+clockId);
            ref.once('value').then(data => {
                if (data.val() == null) {
                    let saveClock = ref.set(dataTemplate)
                    if (saveClock) {
                        res.send({
                            statusCode: 200,
                            message: "Save successfully",
                            clockData: {
                                clockName: clockName,
                                timeZone: "Thai",
                                roomTemperature: 0,
                                clockBattery: 0,
                                clockId: clockId,
                                userId: userId,
                                firebaseId: saveClock.key
                            }
                        })
                    } else {
                        res.send({
                            statusCode: 400,
                            message: "Save fail"
                        })
                    }
                } else {
                    res.send({
                        statusCode: 400,
                        message: "Have already"
                    })
                }
            })
        } else {
            res.send({
                statusCode: 401,
                message: "Authorization fail"
            })
        }
    } catch (e) {
        res.send({
            statusCode: 500,
            message: "Internal server error",
            error: e.toString()
        })
    }
});

clock.put('/item/:firebaseId', async (req, res) => {
    try {
        let { clockName, timeZone } = req.body;
        let { firebaseId } = req.params;
        let { authorization } = req.headers;
        let {userId} = await validateToken(authorization);
        if (userId) {
            let ref = admin.database().ref('/Clocks/' + firebaseId);
            let updateClock = ref.update({
                "clockName": clockName,
                "timeZone": timeZone
            });

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
        } else {
            res.send({
                statusCode: 401,
                message: "Authorization fail"
            })
        }
    } catch (e) {
        res.send({
            statusCode: 500,
            message: "Internal server error",
            error: e.toString()
        })
    }
});

clock.delete('/item/:firebaseId', async (req, res) => {
    try {
        let { firebaseId } = req.params;
        let { authorization } = req.headers;
        let {userId} = await validateToken(authorization);

        if (userId) {
            let ref = admin.database().ref('/Clocks/' + firebaseId);
            let delClock = ref.remove();

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
        } else {
            res.send({
                statusCode: 401,
                message: "Authorization fail"
            })
        }
    } catch (e) {
        res.send({
            statusCode: 500,
            message: "Internal server error",
            error: e.toString()
        })
    }
});

module.exports = clock;