import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, FlatList, Image, StyleSheet, Pressable } from 'react-native';
import { getStorage, listAll, ref, getDownloadURL } from 'firebase/storage';
import app from '../firebaseConfig.js';

export default function Galeria() {
    const [loading, setLoading] = useState(true);
    const [images, setImages] = useState([]);
    const storage = getStorage(app);

    useEffect(() => {
        fetchImages();
    }, []);

    const fetchImages = async () => {
        const storageRef = ref(storage);
        setLoading(true);

        try {
            const listResult = await listAll(storageRef);
            const imagePromises = listResult.items.map(async (item) => {
                const url = await getDownloadURL(item);
                return { url, name: item.name };
            });

            const imageObjects = await Promise.all(imagePromises);
            setImages(imageObjects);
            setLoading(false);
        } catch (error) {
            console.error('Erro ao listar as imagens:', error);
        }
    };

    const renderItem = ({ item }) => (
        <View style={styles.imageItem}>
            <Image source={{ uri: item.url }} style={styles.thumbnail} />
        </View>
    );

    return (
        <View style={styles.container}>
            {loading ? (
                <ActivityIndicator size="large" color='#77787d' />
            ) : (
                <>
                    <FlatList
                        data={images}
                        keyExtractor={(item) => item.name}
                        renderItem={renderItem}
                    />
                    <Pressable style={styles.botao} onPress={() => fetchImages()}>
                        <Text>Recarregar</Text>
                    </Pressable>
                </>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        alignItems: 'center',
    },
    imageItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
    },
    thumbnail: {
        width: 300,
        height: 200,
        marginRight: 10,
    },
    botao: {
        backgroundColor: 'lightblue',
        padding: 10,
        borderRadius: 5,
        marginVertical: 10,
    },
});

