const apiKey = "TU_API_KEY_DE_TMDB"; // Sustituye con tu propia API Key de TMDb

document.getElementById("search-btn").addEventListener("click", searchMovies);

async function searchMovies() {
  const query = document.getElementById("search-input").value;
  const response = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`
  );
  const data = await response.json();
  displayMovies(data.results);
}

function displayMovies(movies) {
  const moviesContainer = document.getElementById("movies-container");
  moviesContainer.innerHTML = ""; // Limpiar resultados anteriores

  movies.forEach((movie) => {
    const movieElement = document.createElement("div");
    movieElement.classList.add("movie-item");
    movieElement.innerHTML = `
            <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="${movie.title}" data-id="${movie.id}">
            <h3>${movie.title}</h3>
        `;
    movieElement.addEventListener("click", () => showMovieDetails(movie));
    moviesContainer.appendChild(movieElement);
  });
}

function showMovieDetails(movie) {
  const modal = document.getElementById("movie-modal");
  const modalContent = document.getElementById("modal-movie-info");

  modalContent.innerHTML = `
        <h2>${movie.title}</h2>
        <p>${movie.overview}</p>
        <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="${movie.title}">
    `;

  modal.style.display = "block";
}

document.querySelector(".close").addEventListener("click", () => {
  document.getElementById("movie-modal").style.display = "none";
});
