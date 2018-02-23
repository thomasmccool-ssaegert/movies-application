/**
 * es6 modules and imports
 */
import sayHello from './hello';
sayHello('World');

/**
 * require style imports
 */
const {getMovies} = require('./api.js');
const $ = require('jquery');
// const movieList =
getMovies().then((movies) => {
  console.log('Here are all the movies:');
  $("span").html(" ");
  movies.map(({title, rating, id}) => {
    // console.log(`id#${id} - ${title} - rating: ${rating}`);
      $("span").append(`<dl>`);
    $("span").append(`<dt>${title}</dt><dd>rating: ${rating}</dd>`);
      $("span").append(`</dl>`);

  });
}).catch((error) => {
  alert('Oh no! Something went wrong.\nCheck the console for details.')
  console.log(error);
});
