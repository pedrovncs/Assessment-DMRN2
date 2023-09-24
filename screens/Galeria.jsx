import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Galeria = () => {
    if (galeria) {
/*             const storageRef = ref(storage, `_foto_eventos_${data.getTime()}.jpg`);
            const req = listAll(storageRef);
            req.then(listResult => {
                listResult.items.forEach(ref => {
                    getDownloadURL(ref)
                        .then(url => {
                            setUrlsGaleria(urlsGaleria.push(url));
                        })
                })
            })
        } */
        const storageRef = ref(storage);
        getDownloadURL(storageRef, "yoshi.jpg")
            .then(url => {
                setUrlsGaleria([...urlsGaleria, url]);
            })
            .catch((err) => console.error(err));

        return (
            <View style={styles.container}>
                <Pressable onPress={() => setGaleria(!galeria)}>
                    <Text>{galeria ? "True" : "False"}</Text>
                </Pressable>
            </View>
        );
    }
}

export default Galeria

const styles = StyleSheet.create({})