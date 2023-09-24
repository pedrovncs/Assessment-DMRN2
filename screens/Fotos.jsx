import { StyleSheet, Text, View, Pressable, Image } from 'react-native';
import { Camera } from 'expo-camera';
import React, { useEffect, useState } from 'react';
import { getDownloadURL, getStorage, listAll, ref, uploadBytes } from 'firebase/storage';
import app from '../firebaseConfig.js';

export default function Fotos() {
    const [temPermissao, setTemPermissao] = useState(null);
    const [camera, setCamera] = useState(null);
    const [uri, setUri] = useState(null);
    const [galeria, setGaleria] = useState(false);
    const [urlsGaleria, setUrlsGaleria] = useState([]);
    const storage = getStorage(app);

    useEffect(() => {
        const getCameraPermission = async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setTemPermissao(status === 'granted');
        };

        getCameraPermission();
    }, []);

    const tirarFoto = async () => {
        if (camera) {
            const { uri } = await camera.takePictureAsync();
            setUri(uri);
        }
    };

    const enviarFoto = async () => {
        if (uri) {
            const foto = await fetch(uri);
            const fotoBlob = await foto.blob();
            const data = new Date();
            const storageRef = ref(storage, `_foto_eventos_${data.getTime()}.jpg`);
            uploadBytes(storageRef, fotoBlob)
                .then(() => {
                    setUri(null);
                })
        }
    };

    if (galeria) {
        const storageRef = ref(storage);

        //     const req = listAll(storageRef);
        //     req.then(listResult => {
        //         listResult.items.forEach(ref => {
        //             getDownloadURL(ref)
        //                 .then(url => {
        //                     setUrlsGaleria(urlsGaleria.push(url));
        //                 })
        //         })
        //     })
        // }


        getDownloadURL(storageRef, "yoshi.jpg")
            .then(url => {
                setUrlsGaleria([...urlsGaleria, url]);
            })


        // listResult.items.forEach(ref => {   
        //     getDownloadURL(ref)
        //         .then(url => {
        //             setUrlsGaleria(urlsGaleria.push(url));
        //             })  
        //         })

        return (
            <View style={styles.container}>
                <Pressable onPress={() => setGaleria(!galeria)}>
                    <Text>{galeria ? "True" : "False"}</Text>
                </Pressable>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {!uri && (
                <Camera
                    style={styles.cam}
                    type={Camera.Constants.Type.back}
                    ref={(ref) => setCamera(ref)}
                />
            )}
            {uri && (
                <>
                    <Image source={{ uri }} style={styles.imagem} />
                    <Pressable style={styles.botao} onPress={enviarFoto}>
                        <Text>Enviar foto</Text>
                    </Pressable>
                </>
            )}
            <Pressable style={styles.botao} onPress={tirarFoto}>
                <Text>Tirar Foto</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        alignItems: 'center',
    },
    cam: {
        width: '90%',
        borderRadius: 5,
    },
    botao: {
        backgroundColor: 'lightblue',
        padding: 15,
        borderRadius: 5,
        margin: 15,
    },
    imagem: {
        width: 300,
        height: 300,
        borderRadius: 5,
    },
});
