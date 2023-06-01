import React, { useEffect, useState } from 'react';
import { View, Text, Button, ScrollView, Image } from 'react-native';
import { addFavorite } from '../FavoritesScreen/favorites';
import { fetchMovies } from '../service/api';

export default function HomeScreen({ navigation }) {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        fetchMovies()
            .then(movies => {
                setMovies(movies);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    const handleAddFavorite = (movie) => {
        addFavorite(movie)
            .then(() => {
                console.log('Filme adicionado aos favoritos:', movie.title);
            })
            .catch(error => {
                console.error(error);
            });
    };

    return (
        <ScrollView>
            <View>
                <Text>Lista de Filmes:</Text>
                {movies.map(movie => (
                    <View key={movie.id}>
                        <Text>{movie.title}</Text>
                        <Text>Visão Geral: {movie.overview}</Text>
                        <Text>Média de votos: {movie.vote_average}</Text>
                        <Button
                            title="Adicionar aos Favoritos"
                            onPress={() => handleAddFavorite(movie)}
                        />
                    </View>
                ))}
            </View>
        </ScrollView>
    );
}
