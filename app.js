const { log } = require("console");
const bodyParser = require("body-parser");
const express = require("express");
const https = require("https")
const app = express();
const port = 4040;

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
   


    
});

app.post("/", function(req, res){
    const query = req.body.cityName;
    const apiKey = "7c0f01e5543d7065beb49e91ec9476e9"
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&units=metric&appid=" + apiKey
    https.get(url, function(response){ // helps to interact with the api
        console.log(response.statusCode);
        // console.log(response.statusCode); this code helps to check the status code of your web app, 200 is good

        response.on("data", function(data){
            //JSON.parse helps to convert what ever data we got from the url to json format we can read
            const weatherData = JSON.parse(data)
            const temp = weatherData.main.temp
            const tempertaure = Math.round(temp)
            const desc = weatherData.weather[0].description
            const icon = weatherData.weather[0].icon
            const imageURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png"
            console.log(temp +" "+ desc +" "+ icon + tempertaure);
            res.write("<h1>The tempertaure in " + query + " is " + tempertaure + " degrees celcius</h1>");// 'res.write' can be used to write whatever you feel like displaying in the local host then you use 'res.send()- you can use the write command without this' to send to the local host whatever was written
            res.write("<p>The weather currently has " + desc + "</p>");
            res.write("<img src=" + imageURL +">")
            res.send()
            


        })

    })
    console.log(req.body.cityName)

})

app.listen(port, function() {
    console.log(`Server is running on port ${port}`);
})
