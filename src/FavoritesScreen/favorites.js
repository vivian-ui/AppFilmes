import AsyncStorage from '@react-native-async-storage/async-storage';

export const getFavorites = async () => {
    try {
        const favoritesString = await AsyncStorage.getItem('favorites');
        return favoritesString ? JSON.parse(favoritesString) : [];
    } catch (error) {
        console.error(error);
        return [];
    }
};

export const addFavorite = async (movie) => {
    try {
        const favorites = await getFavorites();
        favorites.push(movie);
        const favoritesString = JSON.stringify(favorites);
        await AsyncStorage.setItem('favorites', favoritesString);
    } catch (error) {
        console.error(error);
    }
};

export const removeFavorite = async (movieId) => {
    try {
        const favorites = await getFavorites();
        const updatedFavorites = favorites.filter((movie) => movie.id !== movieId);
        const favoritesString = JSON.stringify(updatedFavorites);
        await AsyncStorage.setItem('favorites', favoritesString);
    } catch (error) {
        console.error(error);
    }
};
