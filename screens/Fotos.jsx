import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Pressable, Image } from 'react-native';
import { Camera } from 'expo-camera';
import { getStorage, ref, uploadBytes } from 'firebase/storage';
import app from '../firebaseConfig.js';

export default function Fotos() {
  const [temPermissao, setTemPermissao] = useState(null);
  const [camera, setCamera] = useState(null);
  const [uri, setUri] = useState(null);
  const [enviando, setEnviando] = useState(false);

  const storage = getStorage(app);

  useEffect(() => {
    const getCameraPermission = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setTemPermissao(status === 'granted');
    };

    getCameraPermission();
  }, []);

  const tirarFoto = async () => {
    try {
      if (camera) {
        const { uri } = await camera.takePictureAsync();
        setUri(uri);
      }
    } catch (error) {
      console.error("Erro ao tirar a foto:", error);
    }
  };

  const cancelarFoto = () => {
    setUri(null);
  };

  const enviarFoto = async () => {
    if (uri) {
      try {
        setEnviando(true);
        const foto = await fetch(uri);
        const fotoBlob = await foto.blob();
        const data = new Date();
        const storageRef = ref(storage, `_foto_eventos_${data.getTime()}.jpg`);
        await uploadBytes(storageRef, fotoBlob);
        setUri(null);
        setEnviando(false);
      } catch (error) {
        console.error("Erro ao enviar a foto:", error);
        setEnviando(false);
      }
    }
  };

  return (
    <View style={styles.container}>
      {!temPermissao ? (
        <Text>Sem permissão para acessar a câmera.</Text>
      ) : (
        <>
          {!uri ? (
            <Camera
              style={styles.cam}
              type={Camera.Constants.Type.back}
              ref={(ref) => setCamera(ref)}
            />
          ) : (
            <>
              <Image source={{ uri }} style={styles.imagem} />
              {enviando ? (
                <Text>Enviando foto...</Text>
              ) : (
                <View>
                  <Pressable style={styles.botao} onPress={enviarFoto}>
                    <Text>Enviar foto</Text>
                  </Pressable>
                  <Pressable style={styles.botao} onPress={cancelarFoto}>
                    <Text>Cancelar</Text>
                  </Pressable>
                </View>
              )}
            </>
          )}
          {!uri && !enviando && (
            <Pressable style={styles.botao} onPress={tirarFoto}>
              <Text>Tirar Foto</Text>
            </Pressable>
          )}
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
    justifyContent: 'center',
  },
  cam: {
    width: '90%',
    height: '50%',
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

