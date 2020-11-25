function popular() {
  fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&language=en-US&sort_by=popularity.desc&include_adult=true&include_video=false&page=1`
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
            div += `
    <div class="col-sm-6 col-md-5 col-lg-4">
     <div class="card-group">
       <div class="card text-white bg-dark mb-3">
  <img class="card-img-top" src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" onerror="this.onerror=null;this.src='https://stoughtonkarate.com/wp-content/uploads/2017/04/default-image-620x600.jpg';">
  <div class="card-body">
    <h5 class="card-title">${movie.title}</h5>
    <p class="text-info">popularity:${movie.popularity}<br/><span class="font-weight-bold text-success">Score:${movie.vote_average}</p>
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
}
