
//Initiallising node modules
var express = require("express");
var bodyParser = require("body-parser");
var sql = require("mssql");
//var sql = require("mssql/msnodesqlv8");
var app = express(); 


// Body Parser Middleware
app.use(bodyParser.json()); 

//CORS Middleware
app.use(function (req, res, next) {
    //Enabling CORS 
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, contentType,Content-Type, Accept, Authorization");
       next();
});

//Setting up server
 var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
 });


 
//Initiallising connection string


var dbConfig = {
    user: 'cm',
    password: 'Central_14',
    server: 'devsrv\\devsql',
    //driver: 'msnodesqlv8',
    database: 'CRM3',
    port: 1433,
    debug: true
   /*  options: {
    //    trustedConnection: true,
       instanceName: 'devsql'
    } */
};


//Function to connect to database and execute query
var  executeQuery = function(res, query){             

 
    sql.connect(dbConfig, function (err) {

        
         if (err) {   
                     console.log("Error while connecting database :- "+dbConfig.database+ " , Error:"+err);
                     res.send(err);
                  }
                  else {
                         // create Request object
                         var request = new sql.Request();
                          
                         // query to the database
                         request.query(query, function (err, res) {
                           if (err) {
                                      console.log("Error while querying database :- " + err);
                                      res.send(err);
                                     }
                                     else {
                                       // var json = JSON.parse(res);
                                       console.log(res);
                                     // res.send(json);
                                    }
                               });
                       }
      });           
}

//GET API
 app.get('/api/users', function(req, res){
                var query = "select top 100 * from users where isactive=1 order by userid desc";
    
                executeQuery (res, query);
                
});  

//POST API
 app.post('/api/users', function(req , res){
                var query = "INSERT INTO [users] (Name,Email,Password) VALUES (req.body.Name,req.body.Email,req.body.Password)";
                executeQuery (res, query);
});

//PUT API
 app.put("/api/users/:id", function(req , res){
                var query = "UPDATE [users] SET Name= " + req.body.username  +  " , Email=  " + req.body.email + "  WHERE Id= " + req.params.id;
                executeQuery (res, query);
});

// DELETE API
 app.delete("/api/users /:id", function(req , res){
                var query = "DELETE FROM [users] WHERE Id=" + req.params.id;
                executeQuery (res, query);

           
});
