import axios from 'axios';

const apiKey = 'b977167db78fe9e80d9a5168b79bbb91'; // Substitua pela  chave de API do TMDb

export const fetchMovies = () => {
    return axios.get(`https://api.themoviedb.org/3/movie/popular?language=pt-BR&api_key=${apiKey}`)
        .then(response => response.data.results)
        .catch(error => {
            console.error(error);
            return [];
        });
};

