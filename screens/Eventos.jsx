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
          keyExtractor={(item) => item.id}
          data={inputSearch.length > 0 ? eventosFiltrados : eventos}
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('Tab', { evento: item })
                }
              >
                <View
                  style={[
                    styles.cardEvento,
                    index === eventos.length - 1 && styles.ultimoCard,
                  ]}
                  key={item.id}
                >
                  <Image
                    style={styles.imagemEvento}
                    source={{
                      uri: item.imagem,
                    }}
                  />
                  <View style={styles.container}>
                    <Text>{item.nome}</Text>
                    <Text>{item.data}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      )}
      {/* Botão de cadastro fixo */}
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
  cardEvento: {
    width: 300,
    backgroundColor: '#fff',
    borderColor: '#000',
    borderRadius: 10,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.5,
    shadowRadius: 10,
    marginBottom: 20,
  },
  ultimoCard: {
    marginBottom: 0, 
  },
  eventosContainer: {
    gap: 20,
    paddingBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imagemEvento: {
    width: 300,
    height: 200,
  },
  container: {
    display: 'flex',
    gap: 20,
    padding: 10,
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
