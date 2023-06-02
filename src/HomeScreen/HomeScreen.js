import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, Image, StyleSheet } from 'react-native';
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

    const renderItem = ({ item }) => (
        <View style={styles.movieContainer} key={item.id}>
            <Image
                source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
                style={styles.movieImage}
            />
            <Text style={{ color: 'blue', fontSize: 25, margin: 5 }}>{item.title}</Text>
            <Text style={{ fontSize: 15, margin: 5 }}>Visão Geral: {item.overview}</Text>
            <Text style={{ color: '#FF0000', fontSize: 15, margin: 5 }}>Média de votos: {item.vote_average}</Text>
            <Button
                title="Adicionar aos Favoritos"
                onPress={() => handleAddFavorite(item)}
            />
            <View style={styles.separator} />
        </View>
    );

    return (
        <FlatList
            data={movies}
            renderItem={renderItem}
            keyExtractor={item => item.id.toString()}
        />
    );
}

const styles = StyleSheet.create({
    movieContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },
    movieImage: {
        width: 200,
        height: 300,
        resizeMode: 'contain',
    },
    separator: {
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
        width: '90%',
        marginVertical: 10,
    },
});
