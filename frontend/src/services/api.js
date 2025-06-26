const API_KEY = "1c6dfd288a38904953ca79cc7c297592"
const BASE_URL = "https://api.themoviedb.org/3" //base endpt for API, send request to this url

export const getPopularMovies = async () => { //when function called, it will fetch result and wait to get result and get json
    const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
    const data = await response.json()
    return data.results
}

export const searchMovies = async (query) => {
    const response = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`);
    const data = await response.json()
    return data.results
}