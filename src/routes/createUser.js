const { firebaseCreateUser } = require('../firebase');
const {getAuth} = require('../firebase');

module.exports.createUser = (req, res) => {

    const email = req.body.email;
    const password = req.body.password;
    console.log(email, password)


    if (!email || !password) {
        res.status(400).json({
            message: 'Fields: {email, password} are required'
        });
        return;
    }

    getAuth().createUser({
        email: email,
        password: password,
        emailVerified: true
    }).then((userRecord) => {
        console.log('Successfully created new user:', userRecord.uid);
        res.status(200).json({})
    }).catch((error) => {
        console.log('Error creating new user:', error);
        res.status(500).json({});
    });



}

