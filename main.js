const api_key = config.MY_KEY;
let row = document.querySelector(".row");
let tvRow = document.querySelector(".tvRow");
let searchBar = document.querySelector("#searchBar");
let movies = document.querySelector(".movies-title");
let tvShows = document.querySelector(".tv-title");

let div = "";
let tvDiv = "";
let query = "";
searchBtn.addEventListener("click", (e) => {
  query = searchBar.value;

  e.preventDefault();

  fetch(
    `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${api_key}`
  )
    .then((data) => {
      return data.json();
    })
    .then((data) => {
      div = div;

      while (div) {
        div = "";
      }
      for (var i = 0; i < data.results.length; i++) {
        fetch(
          `https://api.themoviedb.org/3/movie/${data.results[i].id}?api_key=${api_key}&append_to_response=videos`
        )
          .then((movie) => {
            return movie.json();
          })
          .then((movie) => {
            movies.style.visibility = "visible";

            div += `
    <div class="col-sm-6 col-md-5 col-lg-4">
     <div class="card-group">
       <div class="card text-white bg-dark mb-3">
  <img class="card-img-top" src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" onerror="this.onerror=null;this.src='https://stoughtonkarate.com/wp-content/uploads/2017/04/default-image-620x600.jpg';">
  <div class="card-body">
    <h5 class="card-title">${movie.title}</h5>
    <p class="text-info">Tagliine:${movie.tagline}</p>
    <p class="card-text"><h5>Overview</h5> ${movie.overview}</p>
    <a href="https://www.youtube.com/watch?v=${movie.videos.results[0].key}" class="btn btn-primary">Watch trailer</a>
  </div>
</div>
</div>
</div>
`;

            row.innerHTML = div;
          });
      }
    });
  fetch(
    `https://api.themoviedb.org/3/search/tv?query=${query}&api_key=${api_key}`
  )
    .then((data) => {
      return data.json();
    })
    .then((data) => {
      tvDiv = tvDiv;
      while (tvDiv) {
        tvDiv = "";
      }
      for (var i = 0; i < data.results.length; i++) {
        fetch(
          `https://api.themoviedb.org/3/tv/${data.results[i].id}?api_key=${api_key}&append_to_response=videos`
        )
          .then((tv) => {
            return tv.json();
          })
          .then((tv) => {
            tvShows.style.visibility = "visible";

            tvDiv += `
    <div class="col-sm-6 col-md-5 col-lg-4">
     <div class="card-group">
       <div class="card text-white bg-dark mb-3">
  <img class="card-img-top" src="https://image.tmdb.org/t/p/w500/${tv.poster_path}" onerror="this.onerror=null;this.src='https://stoughtonkarate.com/wp-content/uploads/2017/04/default-image-620x600.jpg';">
  <div class="card-body">
    <h5 class="card-title">${tv.name}</h5>
    <p class="text-info">Tagliine:${tv.tagline}</p>
    <p class="card-text"><h5>Overview</h5> ${tv.overview}</p>
    <a href="https://www.youtube.com/watch?v=${tv.videos.results[0].key}" class="btn btn-primary">Watch trailer</a>
  </div>
</div>
</div>
</div>
`;
            tvRow.innerHTML = tvDiv;
          });
      }
    });
});

const topButton = document.querySelector(".back-to-top");
topButton.addEventListener("click", function () {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth"
  });
});
