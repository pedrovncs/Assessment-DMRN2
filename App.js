import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Cadastro from './screens/Cadastro';
import Eventos from './screens/Eventos';
import Detalhes from './screens/Detalhes';
import Voos from './screens/Voos';
import Info from './screens/Info';
import Fotos from './screens/Fotos';
import Galeria from './screens/Galeria';

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

function FotosTabNavigator() {
  return (
    <BottomTab.Navigator>
      <BottomTab.Screen name="Fotos" component={Fotos} />
      <BottomTab.Screen name="Galeria" component={Galeria} />
    </BottomTab.Navigator>
  );
}

function Drawer() {
  return (
    <DrawerNav.Navigator>
      <DrawerNav.Screen name="Info" component={Info} />
      <DrawerNav.Screen name="MainStack" component={MainStack} options={{ title: 'Eventos DMRN' }} />
      <DrawerNav.Screen name="FotosTab" component={FotosTabNavigator} options={{ title: 'Fotos' }} />
    </DrawerNav.Navigator>
  );
}


function MainStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name='Eventos' component={Eventos} options={{ headerShown: false }} />
      <Stack.Screen name='Tab' component={Tab} options={{ title: 'Eventos' }} />
      <Stack.Screen name="Cadastro" component={Cadastro} />
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
