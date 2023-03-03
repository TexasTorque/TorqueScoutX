const {getAuth} = require('../firebase');

module.exports.deleteUser = (req, res) => {

    const uid = req.body.uid;

    res.set("Access-Control-Allow-Origin", "*");

    if (!uid) {
        res.status(400).json({
            message: 'Fields: {uid} are required'
        });
        return;
    }

    // getAuth().createUser({
    //     email: email,
    //     password: password,
    //     emailVerified: true
    // }).then((userRecord) => {
    //     console.log('Successfully created new user:', userRecord.uid);
    //     res.status(200).json({})
    // }).catch((error) => {
    //     console.log('Error creating new user:', error);
    //     res.status(500).json({});
    // });

    getAuth()
        .deleteUser(uid)
        .then(() => {
            console.log('Successfully deleted user');
            res.status(200).json({});
        })
        .catch((error) => {
            console.log('Error deleting user:', error);
            res.status(500).json({});
        });

}

