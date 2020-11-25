function tvnowPlaying() {
  fetch(
    `https://api.themoviedb.org/3/tv/on_the_air?api_key=${api_key}&language=en-US&page=1`
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
          `https://api.themoviedb.org/3/tv/${data.results[i].id}?api_key=${api_key}&append_to_response=videos`
        )
          .then((tv) => {
            return tv.json();
          })
          .then((tv) => {
            div += `
    <div class="col-sm-6 col-md-5 col-lg-4">
     <div class="card-group">
       <div class="card text-white bg-dark mb-3">
  <img class="card-img-top" src="https://image.tmdb.org/t/p/w500/${tv.poster_path}" onerror="this.onerror=null;this.src='https://stoughtonkarate.com/wp-content/uploads/2017/04/default-image-620x600.jpg';">
  <div class="card-body">
    <h5 class="card-title">${tv.name}</h5>
    <p class="text-info">Release Date:${tv.release_date}<span class="text-success"><br/>Status:${tv.status}</span></p>
    <p class="card-text"><h5>Overview</h5> ${tv.overview}</p>
    <a href="https://www.youtube.com/watch?v=${tv.videos.results[0].key}" class="btn btn-primary">Watch tráiler</a>
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
