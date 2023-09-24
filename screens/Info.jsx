import { StyleSheet, Text, View, Linking, Pressable } from 'react-native'
import Info from '../assets/info';
import Icon from 'react-native-vector-icons/FontAwesome';
import React from 'react'

export default function InfoScreen() {
  return (
    <View style={styles.pageInfo}>
      <View style={styles.infoCard}>
        <Text style={styles.title}>Informações do {Info.appInfo.nome} </Text>
        <Text style={styles.descricao}>{Info.appInfo.descricao}</Text>
        <Text>Desenvolvido por: {Info.appInfo.desenvolvedor}</Text>
        <Text>Versão: {Info.appInfo.versao}</Text>
        <Text>Contato: {Info.appInfo.email}</Text>
      </View>
      <Pressable onPress={() => Linking.openURL(Info.appInfo.github)}>
        <Icon name="github" size={50} />
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  pageInfo: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  descricao: {
    textAlign: 'center', 
    fontSize: 16,
    marginBottom: 10, 
  },
  infoCard: {
    textAlign: 'center',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    marginTop: 20,
    width: '90%',
    alignItems: 'center',
    gap: 10,
    elevation: 5,
  }
})
