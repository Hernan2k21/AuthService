const db = require("../Database/models");
async function initDatabase () {

        try{
        await   db.sequelize.sync();
            console.log("Connected to db")
        }
        catch(e){
            console.trace(e)
        }
       
}

module.exports = initDatabase