const express = require('express');
const cors = require('cors');
const node = express();
const admin = require("../utils/Config");
const firestore = admin.firestore();
node.use(cors({ origin: true }));

node.put('/update/:clockId', async (req, res) => {
    try {
        const {tem, battery} = req.body;
        let { clockId } = req.params;
        let clockRef = firestore.collection('Clocks');
        let data = await new Promise(async function (resolve) {
            await clockRef.where('clockId', '==', clockId).get()
                .then(doc => {
                    if (doc.empty) {
                        resolve(false);
                    } else {
                        doc.forEach( doc => {
                            resolve(doc);
                        })
                    }
                })
                .catch(err => {
                    console.log('Error getting documents' ,err);
                    resolve(false);
                });
        });
        if (data) {
            let updateClock = await clockRef.doc(data.id).update({
                tem: tem,
                battery: battery
            })
            if (updateClock) {
                res.send({
                    statusCode: 200,
                    message: "Update successfully!"
                })
            }
        } else {
            res.send({
                statusCode: 400,
                message: "fail!"
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

node.get('/test', async (req, res) => {
    try {
        let dataTemplate = {
            "name": "name",
            "timeZone": "Thai",
            "temperature": 11,
            "battery": 0,
            "clockId": "ID",
            "userId": "ID"
        };

        // var ref = admin.database().ref('/Clocks/EpCGBZlfW4NF77JAkAM3');
        // let refUpdate = ref.update(message);

        // let ref = admin.database().ref('/Clocks');
        // let refSave = ref.push(dataTemplate);

        // let data_ = [];
        // let clocksRef = admin.database().ref('/Clocks')
        // await clocksRef.on("value", snap => {
        //     snap.forEach(function(data) {
        //         console.log("The " + data.key + " dinosaur's score is " + data.val());
        //         if (data.val().userId == "RQkOPp2OMOhDed4mNjwC") {
        //             data_.push(data.val())
        //         }
        //     });
        //     res.send({
        //         statusCode: 200,
        //         message: "test function realtime database",
        //         arrayOfClock: data_
        //     })
        // });

        // if (refSave) {
        //     res.send({
        //         statusCode: 200,
        //         message: "test function realtime database",
        //         data: refSave.toJSON()
        //     })
        // }
    } catch (e) {
        res.send({
            statusCode: 500,
            message: "Internal server error",
            error: e.toString()
        })
    }
})

module.exports = node;