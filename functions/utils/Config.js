const admin = require('firebase-admin');

const adminFirebase = {
        "type": "service_account",
        "project_id": "smart-wall-clock-c5a79",
        "private_key_id": "a25bcd3aa52cdfc64fd8d1f206988075233a4acc",
        "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDcVhyRQlFvAKtg\nTF4w0gKchHK5bTjP2jCvymE1oE2HSltWXltq0rtx7RbHVZT2HsDgbira33LUgDcY\nmhXhEX5BDTwgQHwNPUTmN6iwlGEprBUYeEHWIVeeb73llN9/lGdqph10mg/9wSoT\niGX6xQH7omERC4n+13QXQK76RqzXaPckRj/AFzL1ctYz/LVkj9QDvPX85LbkTGcN\n6yj725ghSW/WSphL42WFeFWEy1I9Qc19BFJyf2Kug+r3P416Cx80Y9dTtIjYot7j\nGpA0JAoBWDbRarfqJriYTW0YX0iNIxFKgaf32gWEMceKj605vGAiFXoSBRWjkemk\nvoqItpiJAgMBAAECggEAA6Lkg02HzbAXjqC2sDxoYHVmIE3KEXzCxMVEr+92lWxC\nes0sBI9i77kk4QLLpnkw9TM+6qWj6Je6G7eVSLAyzXeJXb3lXjbmj3HCi1wo3gNx\n8K6xZXY06Do6Cn3XvMGx/ZECwkUgTO+LwSPv4kDZ7MbMA82VMtsS69GnNvME0LmU\nqGbkYuKYgjfQWkXJfOR2Em14mi/6+yT/1jKGTNmS4jfBZ38qi86K5ENbjHmeLEpL\nH4xM6pc7Hdj3UxZPD5146LhK62oD/xr538U7lTr9hgTcxalEfLjzoYaMqss7dm1c\nu+OiiXx51fvk1ekqeL5hIxP6l3E1NioWWUi3sOFIdQKBgQDth4/szzfIIqT91eC6\nXOL8nIkFzhaFr+W0diEx+hmeqbqirJaAJZDGZ6wK9xsCEiWikef54+gPy95KVxsu\nXnaPH65oFTVIm7hPqCsEVXq3VIl9YhwGFhj7PHMQq1WfabxvCWVPw1kx7E6iJ1c4\n0UxF8M/mlUCopSnakgvYUnYAVQKBgQDteEogvIdu5Cn1xo4fM3mRJviFnXVLgcOV\nS6CVij1GLygq2iixh/7dfaNPOm7aYLBWHMZHL5+yaSBjr1t3K2QnaxytYq/BDC8v\nSu0suqXAfzt0N5PF4+MNREyOzJDjWJRL69q9XIU/VhKQ80QKeJuGEvKxyFu7n/Sh\nQnRLdyGbZQKBgGDv5CLm5oL88IzPTmmAIvqo/5qo4rQodvxRAXcd9Hq2Ff7xpHIj\n4pO2F5ZaBmGv+kAAf8WR51EbCFsadXNVBdmfOlQr45UASBXqMbQRFoXfMEVFVt59\nAjD2GJeC9OycAFToZrpIpQwkvmqa15POhuw8PPyDiOHKlewnkkH0VUgJAoGAbaj2\n0lc9U4AZwF2Ik+/5W4ZbjZhA6jVqVC8wYN4NnbN5IRDNae4bS70RBS0+s6mixKFV\nDtp3LLRPOLlpy4ZGIc3c2FSSRNuTjotTKyymDlay5eAkZWXvG9lGYUsmPVZSZRzt\nTjTDc5QTzswHx64aY7esS1zyv5oGJdHCUncZFeECgYAPWtrf+c48w5WE9tNpCgA3\nRNjvOMhyA8kJhRwZ4EQ6Xqs6XUgZL3JEIW1yzFO5nzqZTKNHLC2SnPLG/Lu7bPrn\n4e/B7hzVAxZXBstYAWnt/Jl0qys3t0uwYhAmV3iIg4cR6TujzsezdyZYSh5i4mCW\n8AjIFayCxlMHEAMvT1tvZQ==\n-----END PRIVATE KEY-----\n",
        "client_email": "firebase-adminsdk-hf7p0@smart-wall-clock-c5a79.iam.gserviceaccount.com",
        "client_id": "109546096807007556400",
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://oauth2.googleapis.com/token",
        "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
        "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-hf7p0%40smart-wall-clock-c5a79.iam.gserviceaccount.com"
};

admin.initializeApp({
    credential: admin.credential.cert(adminFirebase),
    databaseURL: "https://smart-wall-clock-c5a79.firebaseio.com"
});

module.exports = admin;