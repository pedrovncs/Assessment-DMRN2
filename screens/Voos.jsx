// import React from 'react';
// import { StyleSheet, Text, View } from 'react-native';

// export default function ListaDeVoosScreen({ route }) {
//   const { evento } = route.params;

//   return (
//     <View style={{ margin: 'auto' }}>
//       {evento.voos === undefined ? (
//         <Text>Não há voos disponíveis para {evento.nome}</Text>
//       ) : (
//         <View>
//           <Text>Voos disponíveis para {evento.nome}:</Text>
//           {evento.voos.map((voo, index) => (
//             <View style={styles.cardVoos} key={index}>
//               <Text style={styles.nome}>Companhia Aérea: {voo.compania_aerea}</Text>
//               <Text style={styles.nomeLoacal}>Origem: {voo.saida}</Text>
//               <Text style={styles.info}>Horário de partida: {voo.horario_partida}</Text>
//               <Text style={styles.nomeLoacal}>Destino: {voo.chegada}</Text>
//               <Text style={styles.info}>Horário de chegada: {voo.horario_chegada}</Text>
//             </View>
//           ))}
//         </View>
//       )}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   cardVoos: {
//     backgroundColor: '#fff',
//     borderRadius: 5,
//     padding: 10,
//     margin: 10,
//     width: 300,
//     height: 200,
//     alignItems: 'center',
//     justifyContent: 'center',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 5 },
//     shadowOpacity: 0.8,
//     shadowRadius: 5,
//   },
//   info: {
//     fontSize: 15,
//     fontWeight: 'bold',
//     color: '#000',
//     textAlign: 'center',
//   },
//   nome: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#000',
//     textAlign: 'center',
//   },
// });
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function ListaDeVoosScreen({ route }) {
  const { evento } = route.params;

  return (
    <View style={styles.container}>
      {evento.voos === undefined ? (
        <Text style={styles.title}>Não há voos disponíveis para {evento.nome}</Text>
      ) : (
        <View style={styles.infoContainer}>
          <Text style={styles.title}>Voos disponíveis para {evento.nome}:</Text>
          {evento.voos.map((voo, index) => (
            <View style={styles.infoCard} key={index}>
              <Text style={styles.info}>Companhia Aérea: {voo.compania_aerea}</Text>
              <Text style={styles.info}>Origem: {voo.saida}</Text>
              <Text style={styles.info}>Horário de partida: {voo.horario_partida}</Text>
              <Text style={styles.info}>Destino: {voo.chegada}</Text>
              <Text style={styles.info}>Horário de chegada: {voo.horario_chegada}</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
  },
  infoContainer: {
    alignItems: 'center',
    width: '100%',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10, 
  },
  infoCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    marginTop: 20,
    width: '90%',
    alignItems: 'center',
    gap: 10,
    elevation: 5,
  },
  info: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
  },
});
