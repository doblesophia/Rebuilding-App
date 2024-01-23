import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import RegisterConstructora from './views/RegisterConstructora';
import RegisterVecino from './views/RegisterVecino';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native'
import { createDrawerNavigator } from '@react-navigation/drawer';
import LoginComponent from './views/Login';
import Lobby from './views/Lobby';
import AddConstructionS from './components/AddConstructionS.jsx';
import Mapa from './views/Mapa.jsx';
import AddMarkerForm from './views/MapaConUbisYPin.jsx';
import MapaRampa from './views/MapaDireccionRampa.jsx';
import MapaConUbisYPinRampas from './views/MapaConUbisYPinRampas.jsx';
import MapaconRampasyObras from './views/MapaconRampasyObras.jsx';
import SlideConstructora from './views/SlideConstructora.jsx';
import Matches from './views/Matches.jsx';
import CierreSesion from './views/CierreSesion.jsx';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native'
import CarritoDeCompras from './views/CarritoDeCompras.jsx';
import PerfilVecino from './views/PerfilVecino.jsx';
import SolicitudRampa from './views/SolicitudRampa.jsx';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack'


const Tab = createBottomTabNavigator()
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
import { BottomTabNavigator } from "@react-navigation/native"

export default function App() {
  const [userRole, setRole] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  let solicitudRampaScreen = null;
  let screens = [];

  useEffect(() => {
    checkSession();
  }, []);

  const checkSession = async () => {
    try {
      const userRole = await AsyncStorage.getItem('userRole');

      setRole(userRole);
      setIsLoading(false);
    } catch (error) {
      console.error('Error al verificar la sesión:', error);
    }
  };

  if (isLoading) {
    return <Text>Está cargando</Text>;
  }
 

  return (
    <NavigationContainer>
    <Stack.Navigator>
          <Stack.Screen name="Inicia sesión" component={LoginComponent}/>
          <Stack.Screen name = "Regístrate como vecino" component={RegisterVecino}/>
          <Stack.Screen name="Registra tu constructora" component={RegisterConstructora}/>
          <Stack.Screen name='Menú' component={Lobby} />
          <Stack.Screen name="Mapa Rampa" component={MapaRampa} />
          <Stack.Screen name="Ubicación de Rampa" component={MapaConUbisYPinRampas} />
          <Stack.Screen name= "Perfil Vecino" component={PerfilVecino}/>
    
        
          
          <Stack.Screen name="Agregar residuos" component={AddConstructionS} />
          <Stack.Screen name="Mapa" component={Mapa} />
          <Stack.Screen name="Ubicaciones" component={AddMarkerForm} />
          
        
          <Stack.Screen name = "Solicitud Rampa" component={SolicitudRampa}/>
          <Stack.Screen name="Matches Ubicación" component={MapaconRampasyObras} />
          <Stack.Screen name="Perfil Constructora" component={SlideConstructora} />
          <Stack.Screen name="Matches" component={Matches}/>
          <Stack.Screen name='Carrito de Compras' component={CarritoDeCompras}/>
          <Stack.Screen name="Cierra tu sesión" component={CierreSesion} />
    
    </Stack.Navigator>
  </NavigationContainer>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
