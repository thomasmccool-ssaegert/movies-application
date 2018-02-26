/**
 * es6 modules and imports
 */
// import sayHello from './hello';
// sayHello('World');

/**
 * require style imports
 */


//////////////////////////// Print Movie List To Dom

const {getMovies} = require('./api.js');
const $ = require('jquery');

    getMovies().then((movies) => {
      console.log('Here are all the movies:');
      $("span").html(" ");
      movies.map(({title, rating, id}) => {
        $("#movie-list").append(`<div class="movie-wrap"><div class="movie-title">${title}</div><div class="star-all"><img src="images/star-${rating}.png"></div><button class="edit-this-movie" data-id="${id}" value="${id}">Edit</button><button class="delete-this-movie" id="delete-movie" data-id="${id}" value="${id}">delete</button></div>`);
      });

/////////////////////////// Edit Movie

        let idToEdit;
        $('.edit-this-movie').click(function() {
            $(".modal").css({"display":"block"})
            idToEdit =  this.getAttribute('data-id');
            getMovies().then((movies) => {
                let movieUpdate = editThisMovie(movies);
                $('#edit-title').val(movieUpdate[0].title);
                $('#edit-rating').val(movieUpdate[0].rating);
            });
            function editThisMovie(movies){
                let movieUpdate = movies.filter((movie) =>
                    movie.id === parseFloat(idToEdit)
                );
                return movieUpdate;
            }        });


        $("#update-movie").click(function() {
            event.preventDefault();
            let updatedMovie = {
                title: $('#edit-title').val(),
                rating: $('#edit-rating').val(),
                // id: $("#editMovieID").val()
            };
            const url = ('/api/movies/' + parseFloat(idToEdit));
            // const url = ("/api/movies");
            const options = {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedMovie)
            };
            fetch(url, options)
                .then(getMovies);
            $('#edit-title').val("");
            $('#edit-rating').val("");
            $(".modal").css({"display":"none"})
            location.reload();
        });

/////////////////////////// Delete Movie
        $('.delete-this-movie').click(function() {
            $(".modal2").css({"display":"block"});
            idToEdit =  this.getAttribute('data-id');
            getMovies().then((movies) => {
                let movieUpdate = editThisMovie(movies);
                $('#edit-title').val(movieUpdate[0].title);
                $('#edit-rating').val(movieUpdate[0].rating);
           });
            function editThisMovie(movies){
                let movieUpdate = movies.filter((movie) =>
                    movie.id === parseFloat(idToEdit)
                );

                $("#delete-header").append(`Are you sure you want to delete <strong>${movieUpdate[0].title}</strong>`);
                return movieUpdate;
            }        });


        $("#delete-movie-yes").click(function() {
            event.preventDefault();
            let deletedMovie = {
                title: $('#edit-title').val(),
                rating: $('#edit-rating').val(),
                id: $("#editMovieID").val()
            };
            const url = ('/api/movies/' + parseFloat(idToEdit));
            // const url = ("/api/movies");
            const options = {
                method: 'delete',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(deletedMovie)
            };
            fetch(url, options)
                .then(getMovies);
            $('#edit-title').val("");
            $('#edit-rating').val("");
            $(".modal").css({"display":"none"})
            location.reload();
        });


/////////////////////////// Close Modal

        $('.close').click(function() {
            $(".modal").css({"display":"none"})
        });


        let modal = document.getElementById('myModal');
        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }

/////////////////// close delete
        $('.close2').click(function() {
            $(".modal2").css({"display":"none"})
            $("#delete-header").html("");
        });
        $('#delete-movie-no').click(function() {
            $(".modal2").css({"display":"none"})
            $("#delete-header").html("");
        });

        let modal2 = document.getElementById('myModal2');
        window.onclick = function(event) {
            if (event.target == modal2) {
            $("#delete-header").html("");
                modal2.style.display = "none";
            }
        }

/////////////////////////// Finish of getMovies

    }).catch((error) => {
      alert('Oh no! Something went wrong.\nCheck the console for details.')
      console.log(error);
    });

/////////////////////////// Add A Movie

$("#movie-form").submit(function(e) {
    e.preventDefault();

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
        .then(getMovies);
    $('#movie-title').val('');
    $('#movie-rating').val('');
    location.reload();
});






// Get the modal
// var modal = document.getElementById('myModal');
//
// // Get the button that opens the modal
// var btn = document.getElementById("editThisMovie");
//
// // Get the <span> element that closes the modal
// var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal

// btn.onclick = function() {
//     console.log("working");
//     // modal.style.display = "block";
//     $(".modal").css({"display":"block"})
//
// };
//
// When the user clicks on <span> (x), close the modal
// span.onclick = function() {
//     modal.style.display = "none";
// };
//
// // When the user clicks anywhere outside of the modal, close it
// window.onclick = function(event) {
//     if (event.target == modal) {
//         modal.style.display = "none";
//
//     }
// };








    // $("#movie-form")[0].reset();

//TRYING TO ADD IN WITHOUT RELOAD
     //location.reload();
//     $.ajax(url).done(function(data, status, jqXhr) {
//         alert("AJAX call completed successfully!");
//         console.log("Request status: " + status);
//         console.log("Data returned from server:");
//         console.log(data);
//         data.forEach(function (movie) {
//             if(movie.last){
//                 console.log(movie.title);
//             }
//         })
//     });
// });
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
