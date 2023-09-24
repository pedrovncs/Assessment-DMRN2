import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function ListaDeVoosScreen({ route }) {
  const { evento } = route.params;

  return (
    <View style={{ margin: 'auto' }}>
      {evento.voos === undefined ? (
        <Text>Não há voos disponíveis para {evento.nome}</Text>
      ) : (
        <View>
          <Text>Voos disponíveis para {evento.nome}:</Text>
          {evento.voos.map((voo, index) => (
            <View style={styles.cardVoos} key={index}>
              <Text style={styles.nome}>Companhia Aérea: {voo.compania_aerea}</Text>
              <Text style={styles.nomeLoacal}>Origem: {voo.saida}</Text>
              <Text style={styles.info}>Horário de partida: {voo.horario_partida}</Text>
              <Text style={styles.nomeLoacal}>Destino: {voo.chegada}</Text>
              <Text style={styles.info}>Horário de chegada: {voo.horario_chegada}</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  cardVoos: {
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 10,
    margin: 10,
    width: 300,
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
  },
  info: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
  },
  nome: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
  },
});
