/**
 * es6 modules and imports
 */
import sayHello from './hello';
sayHello('World');

/**
 * require style imports
 */

// GETTING MOVIES AND BUILDING THE LIST
const {getMovies} = require('./api.js');
const $ = require('jquery');

getMovies().then((movies) => {
  console.log('Here are all the movies:');
  $("span").html(" ");
  movies.map(({title, rating, id}) => {
    // console.log(`id#${id} - ${title} - rating: ${rating}`);
    $("#movie-list").append(`<dl>`);
    $("#movie-list").append(`<dt>${title}</dt><dd>rating: ${rating}</dd>`);
    $("#movie-list").append(`</dl>`);
  });
}).catch((error) => {
  alert('Oh no! Something went wrong.\nCheck the console for details.')
  console.log(error);
});



// FORM TO ADD MOVIES  -------------------


$("#movie-form").submit(function(e) {
    e.preventDefault();
    // $("#city-weather").html("");
    // $("#current-forecast").html("");
    // latLon.newLat = $("#latitude").val();
    // latLon.newLon = $("#longitude").val();
    // forecast(latLon);

// CONSOLE LOGGING INPUT SUBMIT
    console.log($("#movie-title").val());
    console.log($("#movie-rating").val());

// ADDING MOVIE TO DB.JSON
const movieList = {title: $("#movie-title").val(), rating: $("#movie-rating").val()};
const url = '/api/movies';
const options = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(movieList),
};
fetch(url, options)
    .then(console.log('post was created successfully'))
    .catch(console.log('error'));

    $("#movie-form")[0].reset();

//TRYING TO ADD IN WITHOUT RELOAD
     //location.reload();
    $.ajax(url).done(function(data, status, jqXhr) {
        alert("AJAX call completed successfully!");
        console.log("Request status: " + status);
        console.log("Data returned from server:");
        console.log(data);
        data.forEach(function (movie) {
            if(movie.last){
                console.log(movie.title);
            }
        })
    });
});
// const updateMovies = () => {
//     return getMovies()
// };

// $('#refresh').click(function (){
//     updateMovies()
// });
// const movieTile;
// const movieRating;
//
//
//
