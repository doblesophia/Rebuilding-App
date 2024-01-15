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
import SolicitudRampa from './views/SolicitudRampa.jsx';
import MapaRampa from './views/MapaDireccionRampa.jsx';
import MapaConUbisYPinRampas from './views/MapaConUbisYPinRampas.jsx';
import MapaconRampasyObras from './views/MapaconRampasyObras.jsx';
import SlideConstructora from './views/SlideConstructora.jsx';
import Matches from './views/Matches.jsx';
import CierreSesion from './views/CierreSesion.jsx';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native'


const Drawer = createDrawerNavigator();

export default function App() {
  const [role, setRole] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

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
    <Drawer.Navigator>
          <Drawer.Screen name="Inicia sesión" component={LoginComponent}/>
          <Drawer.Screen name = "Regístrate como vecino" component={RegisterVecino}/>
          <Drawer.Screen name="Registra tu constructora" component={RegisterConstructora}/>
          <Drawer.Screen name='Menú' component={Lobby} />
          <Drawer.Screen name="Solicitud Rampa" component={SolicitudRampa} />
          <Drawer.Screen name="Mapa Rampa" component={MapaRampa} />
          <Drawer.Screen name="Ubicación de Rampa" component={MapaConUbisYPinRampas} />
    
        
          
          <Drawer.Screen name="Agregar residuos" component={AddConstructionS} />
          <Drawer.Screen name="Mapa" component={Mapa} />
          <Drawer.Screen name="Ubicaciones" component={AddMarkerForm} />
          
        
          
          <Drawer.Screen name="Matches Ubicación" component={MapaconRampasyObras} />
          <Drawer.Screen name="Perfil Constructora" component={SlideConstructora} />
          <Drawer.Screen name="Matches" component={Matches} />
          <Drawer.Screen name="Cierra tu sesión" component={CierreSesion} />
    
    </Drawer.Navigator>
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
