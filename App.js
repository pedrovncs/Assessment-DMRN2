import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Cadastro from './screens/Cadastro';
import Eventos from './screens/Eventos';
import Detalhes from './screens/Detalhes';
import Voos from './screens/Voos';
import Home from './screens/Home';
import Fotos from './screens/Fotos';


const Stack = createNativeStackNavigator();
const BottomTab = createBottomTabNavigator();
const DrawerNav = createDrawerNavigator();

function Tab({ route }) {
  const { evento } = route.params;

  return (
    <BottomTab.Navigator>
      <BottomTab.Screen
        name="Detalhes"
        initialParams={{ evento: evento }}
        component={Detalhes}
      />
      <BottomTab.Screen
        name="Voos"
        initialParams={{ evento: evento }}
        component={Voos}
      />
    </BottomTab.Navigator>
  );
}


function Drawer() {
  return (
    <DrawerNav.Navigator>
      <DrawerNav.Screen
        name="Home"
        component={Home} />
      <DrawerNav.Screen
        name="Stack"
        component={MainStack}
        options={{ title: 'Eventos' }} />
      <DrawerNav.Screen
        name="Fotos"
        component={Fotos}
        options={{ title: 'Fotos' }} />
    </DrawerNav.Navigator>
  );
}

function MainStack() {
  return (
    <Stack.Navigator >
      <Stack.Screen
        name='Eventos'
        component={Eventos}
        options={{ headerShown: false }} />
      <Stack.Screen
        name='Tab'
        component={Tab}
        options={{ title: 'Eventos' }} />
        <Stack.Screen
        name="Cadastro"
        component={Cadastro} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Drawer />
    </NavigationContainer>
  );
}
