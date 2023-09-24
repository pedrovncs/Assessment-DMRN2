import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Switch, Pressable } from "react-native";
import axios from '../axios.js';
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";


export default function Cadastro() {
  const [nome, setNome] = useState('');
  const [local, setLocal] = useState('');
  const [valor, setValor] = useState('0');
  const [descricao, setDescricao] = useState('');
  const [eventoGratuito, setEventoGratuito] = useState(true);
  const [dataEvento, setDataEvento] = useState(new Date());
  const [imagem, setImagem] = useState('');
  const [enviado, setEnviado] = useState(false);
  const [error, setError] = useState(false);

  const handleNome = (text) => {
    setNome(text);
  };

  const handleLocal = (text) => {
    setLocal(text);
  };

  const handleValor = (text) => {
    setValor(text);
  }

  const handleDescricao = (text) => {
    setDescricao(text);
  }

  const showDatepicker = (options) => {
    DateTimePickerAndroid.open(options)
  }

  const updateDate = (event, selDate) => {
    setDataEvento(selDate);
  }

  const handleImagem = (text) => {
    setImagem(text);
  }

  const handleEventoGratuito = () => { setEventoGratuito(!eventoGratuito);
    const novoValor = eventoGratuito ? '' : '0'; 
    setValor(novoValor); 
   
  };
  
  const handleSubmit = () => {
    const obj = {
      nome,
      local,
      descricao,
      preco: parseFloat(valor),
      data: dataEvento.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit',
      }),
      imagem,
    }
    axios.post('/eventos.json', obj)
      .then((response) => {
        if (obj.nome === '' || obj.local === '' || obj.valor === '' || obj.dataEvento === '' || obj.imagem === '' || obj.descricao === '') {
          setError(true);
          setTimeout(() => {
            setError(false);
          }, 3000);
          return;
        } else {
          setEnviado(true);
          setTimeout(() => {
            setEnviado(false);
          }, 3000); 
        }
      });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro de Eventos</Text>
      <View >
        <TextInput
          style={styles.input}
          placeholder="Nome do Evento"
          onChangeText={handleNome}
          value={nome}
        />
        <TextInput
          style={styles.input}
          placeholder="Local do Evento"
          onChangeText={handleLocal}
          value={local}
        />
        <TextInput
          style={styles.input}
          placeholder="Descrição do Evento"
          onChangeText={handleDescricao}
          value={descricao}
        />
        <TextInput
          style={styles.input}
          placeholder="Imagem do Evento"
          onChangeText={handleImagem}
          value={imagem}
        />
      </View>
      <View style={styles.switchContainer}>
        <Text>
          Evento Gratuito
        </Text>
        <Switch
          label='Evento Gratuito'
          onValueChange={handleEventoGratuito}
          value={eventoGratuito}
        />
      </View>
      {!eventoGratuito && (
        <TextInput
          style={styles.input}
          placeholder="Valor do Evento"
          onChangeText={handleValor}
          value={valor}
          keyboardType="numeric"
        />

      )}
      <View>
        <Pressable onPress={() => {
          showDatepicker({
            mode: 'date',
            display: 'calendar',
            onChange: updateDate,
            value: dataEvento,
          })
        }}>
          <Text>Data do Evento:</Text>
          <Text>{dataEvento.toLocaleDateString('pt-BR', { year: 'numeric', month: 'long', day: 'numeric' })}</Text>
        </Pressable>
      </View>
      <Button title='Enviar' onPress={handleSubmit} />
      {enviado && (<Text> Enviado com sucesso! </Text>)}
      {error && (<Text> Preencha todos os campos! </Text>)}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    gap: 10,
  },
  input: {
    height: 40,
    margin: 5,
    borderWidth: 1,
    padding: 10,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  }
})
