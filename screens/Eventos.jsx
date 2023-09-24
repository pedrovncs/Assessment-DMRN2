import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, Button, FlatList, ActivityIndicator } from 'react-native';
import axios from '../axios.js';

export default function EventosScreen({ navigation }) {
  const [inputSearch, setInputSearch] = useState('');
  const [eventos, setEventos] = useState([]);
  const [eventosFiltrados, setEventosFiltrados] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleFilter = (text) => {
    setInputSearch(text);
    const filteredEventos = eventos.filter((evento) => {
      return evento.nome.toLowerCase().includes(text.toLowerCase());
    });
    setEventosFiltrados(filteredEventos);
  };

  const fetchData = async () => {
    setIsLoading(true);
    axios.get('/eventos.json').then((resp) => {
      const list = axios.converter(resp.data);
      setEventos(list);
      setTimeout(() => {
        setIsLoading(false);
      }, 1200)
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.flexRow}>
        <TextInput
          style={styles.input}
          placeholder="Pesquisar evento"
          value={inputSearch}
          onChangeText={handleFilter}
        />
        <Button onPress={() => fetchData()} title="Recarregar" />
      </View>
      {isLoading ? (
        <View style={styles.carregando}>
          <ActivityIndicator size="large" color='#77787d' />
          <Text>Carregando...</Text>
        </View>
      ) : (
        <FlatList
          contentContainerStyle={styles.eventosContainer}
          keyExtractor={(item) => item.id}
          data={inputSearch.length > 0 ? eventosFiltrados : eventos}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('Tab', { evento: item })
                }
              >
                <View
                  style={styles.cardEvento}
                  key={item.id}
                >
                  <Image
                    style={styles.imagemEvento}
                    source={{
                      uri: item.imagem,
                    }}
                  />
                  <View style={styles.infoContainer}>
                    <Text>{item.nome}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      )}
      <TouchableOpacity
        style={styles.btnCadastro}
        onPress={() => navigation.navigate('Cadastro')}
      >
        <Text style={{ fontSize: 24, color: '#fff' }}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  cardEvento: {
    width: '100%', 
    backgroundColor: '#fff',
    borderColor: '#000',
    borderRadius: 10,
    overflow: 'hidden',
    margin: 10,
  },
  eventosContainer: {
    alignItems: 'center', 
    paddingVertical: 20, 
  },
  imagemEvento: {
    width: 300,
    height: 200,
  },
  infoContainer: {
    padding: 10,
    alignItems: 'center', 
  },
  input: {
    flex: 1, 
    height: 40,
    marginVertical: 12, 
    marginHorizontal: 12, 
    borderWidth: 1,
    padding: 10,
    borderRadius: 5, 
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center', 
  },
  carregando: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  btnCadastro: {
    position: 'absolute',
    width: 50,
    height: 50,
    backgroundColor: 'blue',
    borderRadius: 25,
    zIndex: 1,
    right: 20,
    bottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
