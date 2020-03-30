const jwt = require('jsonwebtoken');
const admin = require("../utils/Config");
const firestore = admin.firestore();
require('custom-env').env();

async function generateToken(userId) {
    try {
        let id = userId;
        let token = await jwt.sign({userId: id}, process.env.JWT_KEY);
        await firestore.collection('token').add({
            token:token,
            userId:id
        });
        return token;
    } catch (e) {
        console.log(e);
    }
}

module.exports = {
    validateToken: async (token) => {
        try {
            if (token == undefined || token == "") {
                return  false
            }

            let decoded = jwt.verify(token, process.env.JWT_KEY);
            if (decoded) {
                return decoded
            } else {
                return false;
            }
        } catch (e) {
            console.log(e);
        }
    },
    login: async (username, password) => {
        try {
            let userRef = firestore.collection('Users');
            let data = await new Promise(async function (resolve) {
                await userRef.where('username', '==', username).get()
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
                if (data.data().password == password) {
                    return {
                        status: true,
                        token: await generateToken(data.id)
                    };
                } else {
                    return {
                        status: false,
                        message: "Password is incorrect"
                    };
                }
            } else {
                return {
                    status: false,
                    message: "User not found!"
                };
            }
        } catch (e) {
            console.log(e);
        }
    },
    logout: async (token) => {
        try {
            let data = await new Promise((resolve) => {
                firestore.collection('token').where('token','==',token).get()
                    .then((snapshot)=> {
                        if (snapshot.empty) {
                            console.log('No matching documents. [logout]');
                            resolve(false);
                        } else {
                            snapshot.forEach(doc=> {
                                resolve(doc);
                            })
                        }
                    })
                    .catch(err => {
                        console.log('Error getting documents', err);
                        resolve(false);
                    });
            });
            let deleteToken = await firestore.collection('token').doc(data.id).delete();
            if (deleteToken) {
                return true;
            } else {
                return false;
            }
        } catch (e) {
            console.log(e);
        }
    }
};
