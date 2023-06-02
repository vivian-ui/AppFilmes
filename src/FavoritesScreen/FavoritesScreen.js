import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, Image, StyleSheet } from 'react-native';
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
                title="Remover dos Favoritos"
                onPress={() => handleRemoveFavorite(item.id)}
            />
            <View style={styles.separator} />
        </View>
    );

    return (
        <FlatList
            data={favorites}
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
