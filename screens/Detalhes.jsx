import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'

export default function DetalhesEventoScreen({ route }) {

  const { evento } = route.params;
  console.log(evento);

  return (
    <View style={styles.cardDetalhes}>
      <Text style={styles.title}> {evento.nome} </Text>
      <Text style={styles.info}> {evento.data} </Text>
      <Image style={styles.image} source={{ uri: evento.imagem }} />
      <Text style={styles.info}> {evento.descricao} </Text>
      <Text style={styles.info}> {evento.local} </Text>
      <Text style={styles.valor}>
        {evento.preco == 0 ? 'Gratuito' : evento.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  cardDetalhes: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    margin: 10,
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#000',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  info: {
    fontSize: 16,

    color: '#030',
  },
  image: {
    width: 300,
    height: 200,
    margin: 10,
  },
  valor: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'green',
  }
})