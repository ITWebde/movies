let MOVIES = movies.splice(0, 100);
let page = 1
let limit = 8

let searchForm = findElement('.search-form')
let moviesCategories = findElement('#genres', searchForm)
let templateMovie = findElement('.card-body').content;
let nextBtn = findElement('.next-btn');
let prevBtn = findElement('.prev-btn');
let wrapperCard = findElement('.wrapper');

function createMovieCard(movie) {
    let templateMovieClone = templateMovie.cloneNode(true);

    let imgMovie = findElement('.movie-img', templateMovieClone);
    let movieTitle = findElement('.movie-title', templateMovieClone);
    let movieCategorie = findElement('.movie-categorie', templateMovieClone)
    let moviYear = findElement('.movie-year', templateMovieClone)
    let movieRating = findElement('.movie-rating', templateMovieClone)

    imgMovie.src = movie.smallPoster;
    movieTitle.textContent = movie.title;
    movieCategorie.textContent = movie.categories.join(', ');
    moviYear.textContent = movie.year + " year";
    movieRating.textContent = movie.imdbRating + " ★"

    wrapperCard.appendChild(templateMovieClone);

}

function uniqueCategories(category) {
    let elOption = document.createElement('option');
    if (!categorys.includes(category)) {
        categorys.push(category)
        elOption.textContent = category
        moviesCategories.append(elOption)
    }
}

var categorys = []

function renderMovies(movies) {
    movies.splice(0, limit).forEach((movie) => {
        createMovieCard(movie)

        movie.categories.forEach((category) => {
            uniqueCategories(category);
        });
    });
}

renderMovies(MOVIES)

function handleSubmit(evt) {
    evt.preventDefault()

    let categorieName = moviesCategories.value;

    wrapperCard.innerHTML = null;

    let filteredMovies = MOVIES.filter(movie =>
        movie.categories.includes(categorieName)
    );

    filteredMovies.forEach(movie => {
        createMovieCard(movie)
    })
}

searchForm.addEventListener('submit', handleSubmit);

function disabledPrevent() {
    if (page === 1 ) {
        prevBtn.disabled = true;
    }else{
        prevBtn.disabled = false
    }
}

function disabledNextBtn() {
    let lastPage = Math.ceil(MOVIES.length / limit)
    if (page === lastPage ) {
        nextBtn.disabled = true;
    }else{
        nextBtn.disabled = false
    }
}

function pagination() {
    MOVIES.slice((page - 1) * limit, page * limit).forEach((movie) => {
        createMovieCard(movie)
    });
}

function handleNextBtn() {
    wrapperCard.innerHTML = null
    page = page + 1

    pagination()
    disabledPrevent()
    disabledNextBtn()
}

function handlePrevBtn() {
    wrapperCard.innerHTML = null;
    page = page - 1; 

    pagination()
    disabledPrevent()
    disabledNextBtn()
}
disabledPrevent()

nextBtn.addEventListener('click', handleNextBtn);
prevBtn.addEventListener('click', handlePrevBtn);
