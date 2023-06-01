import React, { useEffect, useState } from 'react';
import { View, Text, Button, ScrollView } from 'react-native';
import { getFavorites, removeFavorite } from './favorites';

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
        <ScrollView>
            <View>
                <Text>Filmes Favoritos:</Text>
                {favorites.map((movie) => (
                    <View key={movie.id}>
                        <Text>Título: {movie.title}</Text>
                        <Text>Visão Geral: {movie.overview}</Text>
                        <Text>Média de votos: {movie.vote_average}</Text>
                        <Button
                            title="Remover dos Favoritos"
                            onPress={() => handleRemoveFavorite(movie.id)}
                        />
                    </View>
                ))}
            </View>
        </ScrollView>
    );
}
