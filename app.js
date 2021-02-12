/*
 Authors: Hailey Kim
 Your name and student #: Hailey(Hyesang) Kim A01242295
 Your Partner's Name and student #: Jason A01249922
 (Make sure you also specify on the Google Doc)
*/
const express = require("express");
const fs = require("fs")

let app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

let sampleMovie = ["Deadpool", "The Dark Night", "Mad Max","Harry Poter"];
app.get("/", (req, res) => res.render("pages/index",{listOfMovies : sampleMovie}));

app.get("/myForm", (req, res) => res.render("pages/myForm"));

app.post("/myForm", (req, res) => {
  let formData = req.body;
  console.log(formData);
  let movies = formData.moviename;
  let listOfMovies = movies.split(',')
  console.log(listOfMovies);
  res.render("pages/index", {listOfMovies})

});

app.get("/myListQueryString", (req, res) => {
  let movie1 = req.query.movie1;
  let movie2 = req.query.movie2;
  let listOfMovies = [movie1, movie2];
  res.render("pages/index", {listOfMovies});
});

app.get("/search/:movieName", (req, res) => {

  let movie = req.params.movieName;   
  //get movie name from url 
  let searchFound = false;
  let movieDesc = "";
  let movieName = "";
  let homepage = "http://localhost:3000"

  fs.readFile('movieDescriptions.txt',"utf8", function (err,data){ 
  //set call back function

    if(err) throw err;
    let descriptionText = data.toString();
    let description = descriptionText.split("\n"); 
    
    for (let i = 0; i < description.length; i++) {
      let movieSplitArray = description[i].split(":"); //seperate
      movieName = movieSplitArray[0]; 
      movieDesc = movieSplitArray[1];

        if(movieName.toLowerCase() == movie.toLowerCase()){
          searchFound = true;
          break; 
          //not return!!!!
        }
    }

    res.render("pages/searchResult", {movieName,movieDesc,searchFound,homepage})
  })
});

app.listen(3000, () => {
  console.log("Server is running on port 3000 🚀");
});