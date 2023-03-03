const {getAuth} = require('../firebase');

module.exports.listUsers = (req, res) => {
    getAuth().listUsers(100)
    .then(function(result){
        res.set("Access-Control-Allow-Origin", "*");
        res.status(200).json(result);  
    })
    .catch(function(error){
      console.log(error); 
    });
    console.log("done!")
}