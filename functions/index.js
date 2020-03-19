const functions = require('firebase-functions');
const app = require('express')();
require('custom-env').env();

/*
 * Import Controller
 */
const auth = require('./controller/authController');
const clock = require('./controller/clockController');
const node = require('./controller/nodeController');

/*
 * Route Fire_base
 */
exports.auth = functions.https.onRequest(auth);
exports.clock = functions.https.onRequest(clock);
exports.node = functions.https.onRequest(node);

/*
 * Server Start
 */
app.listen(process.env.PORT, () => console.log('Server started at port:'+process.env.PORT));