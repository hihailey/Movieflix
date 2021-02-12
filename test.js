/*
 Authors: 
 Your name and student #: Hailey(Hyesang) Kim A01242295
 Your Partner's Name and student #: Jason 
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
  // Add your implementation here 
  let formData = req.body;
  console.log(formData);
  let movies = formData.moviename;
  let listOfMovies = movies.split(',')
  console.log(listOfMovies);
  res.render("pages/index", {listOfMovies})

});

app.get("/myListQueryString", (req, res) => {
  // Add your implementation here
  let movie1 = req.query.movie1;
  let movie2 = req.query.movie2;
  let listOfMovies = [movie1, movie2];
  res.render("pages/index", {listOfMovies});
});

app.get("/search/:movieName", (req, res) => {
  // Add your implementation here


  fs.readFile('movieDescriptions.txt',"utf8", function (err,data){

    if(err) throw err;

    //let searchFound = false;
    let descriptionText = data.toString();
    let description = descriptionText.split("\n");
    let movie = req.params.movieName;   
    let movieDesc = "";
    // console.log(description);
    // console.log(movie);
    
    for (let i = 0; i < description.length; i++) {
      let movieSplitArray = description[i].split(":");
      movieName = movieSplitArray[0];
      movieDesc = movieSplitArray[1];
      // console.log(movieDesc);
      // console.log(movieName);
      // console.log(movie)
      if(movieName.toLowerCase() == movie.toLowerCase()){
        //searchFound = true;
        console.log(movieDesc);
        res.render("pages/searchResult", {movieName,movieDesc});
        return;
      }else{  
        res.send("Movie not found");
        return;
      }
    }
 })

  });

app.listen(3000, () => {
  console.log("Server is running on port 3000 🚀");
});