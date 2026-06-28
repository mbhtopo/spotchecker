const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root", 
    database: "surf_conditionscore"
});

connection.connect((err) => {
    if(err) {
        console.error("fff", err);
        return;
    }
    console.log("mysql running");

    connection.query("SELECT * FROM surf_spots", (err, results) => {
        if(err){
            console.error(err);
            return;
        }

        console.log(results);
        connection.end();
    })
})

module.exports = connection;
