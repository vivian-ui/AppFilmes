import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { getFavorites, removeFavorite } from './favorites';
import { Button } from 'react-native';

export default function FavoritesScreen({ navigation }) {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            loadFavorites();
        });

        return unsubscribe;
    }, [navigation]);

    const loadFavorites = () => {
        getFavorites()
            .then((favorites) => {
                setFavorites(favorites);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const handleRemoveFavorite = (movieId) => {
        removeFavorite(movieId)
            .then(() => {
                console.log('Filme removido dos favoritos:', movieId);
                const updatedFavorites = favorites.filter((movie) => movie.id !== movieId);
                setFavorites(updatedFavorites);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    useEffect(() => {
        loadFavorites();
    }, []);

    return (
        <View>
            <Text>Filmes Favoritos:</Text>
            {favorites.map((movie) => (
                <View key={movie.id}>
                    <Text>{movie.title}</Text>
                    <Button
                        title="Remover dos Favoritos"
                        onPress={() => handleRemoveFavorite(movie.id)}
                    />
                </View>
            ))}
        </View>
    );
}
