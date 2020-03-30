import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyCmGxUtkK6W2k1G90WzibqnC5X9T1_c564",
    authDomain: "smart-wall-clock-c5a79.firebaseapp.com",
    databaseURL: "https://smart-wall-clock-c5a79.firebaseio.com",
    projectId: "smart-wall-clock-c5a79",
    storageBucket: "smart-wall-clock-c5a79.appspot.com",
    messagingSenderId: "294990350038",
    appId: "1:294990350038:web:831bedd15ce70478782b77",
    measurementId: "G-1PN6CC3MLV"
};

const admin = firebase.initializeApp(firebaseConfig);
firebase.analytics();
export default admin;