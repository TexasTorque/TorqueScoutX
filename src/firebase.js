const serviceAccount = require("./conf/serviceAccountKey.json");
var admin = require("firebase-admin");

const app = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const getAuth = () => app.auth();

module.exports.getAuth = getAuth;

module.exports.firebaseCreateUser = (email, password) => {
    return getAuth().createUser({
        email: email,
        password: password,
        emailVerified: true
    }).then((userRecord) => {
        console.log('Successfully created new user:', userRecord.uid);
    }).catch((error) => {
        console.log('Error creating new user:', error);
    });
}



