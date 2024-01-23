import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import matches from '../assets/brothers.png';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MapaconRampasyObras = (props) => {
  const [obras, setObras] = useState([]);
  const [rampas, setRampas] = useState([]);
  const [correo, setCorreo] = useState("")
  const [nombre, setNombre] = useState("")
  const [apellido, setApellido] = useState("")
  const [role, setRole] = useState(null)


  useEffect(() => {
    fetchData();
  }, []);

  const checkSession = async () => {
    try {
      
      const userToken = await AsyncStorage.getItem('userToken');
      console.log(userToken)
      
      
      if (!userToken) {
        props.navigation.navigate('Inicia sesión'); 
      }

    const correo = await AsyncStorage.getItem('userCorreo');
    const nombre = await AsyncStorage.getItem('nombre');
    const apellido = await AsyncStorage.getItem('apellido')
    const role = await AsyncStorage.getItem("userRole")

    setCorreo(correo)
    setNombre(nombre)
    setApellido(apellido)
    setRole(role)
    console.log(correo)
    console.log(nombre)
      
    } catch (error) {
      console.error('Error al verificar la sesión:', error);
    }
  };

  useEffect(() => {
    checkSession();
  }, []);
  const fetchData = async () => {
    try {
      const obrasResponse = await axios.get("https://2lfj6g4k-3000.brs.devtunnels.ms/obras", {
        params: { timestamp: new Date().getTime() },
      });
      console.log("Obras Response:", obrasResponse);
      console.log("Obras después de setObras:", obras);

      const rampasResponse = await axios.get("https://2lfj6g4k-3000.brs.devtunnels.ms/rampas", {
        params: { timestamp: new Date().getTime() },
      });

      setObras(obrasResponse.data.obra);

      console.log("Obras Response:", obrasResponse.data);
      console.log("Obras después de setObras:", obras);
      setRampas(rampasResponse.data.rampa);
    } catch (error) {
      console.error('Error al obtener ubicaciones desde la API:', error);
    }
  };

  useEffect(() => {
    console.log('Obras en el estado:', obras);
    // Resto del código...
  }, [obras]);
  const calculateDistance = (coord1, coord2) => {
    const R = 6371;
    const dLat = (coord2.latitude - coord1.latitude) * (Math.PI / 180);
    const dLon = (coord2.longitude - coord1.longitude) * (Math.PI / 180);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(coord1.latitude * (Math.PI / 180)) *
        Math.cos(coord2.latitude * (Math.PI / 180)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // Distancia en kilómetros
  };

  const findMatches = async () => {
    try {
      console.log("Obras:", obras);
      console.log("Rampas:", rampas);
  
      const matchesArray = [];
  
      obras.forEach((obra) => {
        console.log("Obras donde cae la función:", obra);
  
        // Encuentra las rampas dentro de un radio de 10 kilómetros de la obra
        const nearbyRampas = rampas.filter((rampa) => {
          if (!rampa.location || rampa.location.lat === undefined || rampa.location.lng === undefined) {
            // Si la rampa no tiene coordenadas, la ignoramos
            return false;
          }
  
          const distanceToRampa = calculateDistance(
            { latitude: obra.location.lat, longitude: obra.location.lng },
            { latitude: rampa.location.lat, longitude: rampa.location.lng }
          );
  
          console.log("Distancia a la rampa:", distanceToRampa, "kilómetros");
  
          // Ajusta el valor 10.0 según el radio deseado
          return distanceToRampa <= 5.0;
        });
  
        console.log("Rampas cercanas:", nearbyRampas);
  
        if (nearbyRampas.length > 0) {
          // Guarda todas las rampas cercanas
          const rampasCercanas = nearbyRampas.map((rampa) => ({
            rampa: rampa._id,
            distance: calculateDistance(
              { latitude: obra.location.lat, longitude: obra.location.lng },
              { latitude: rampa.location.lat, longitude: rampa.location.lng }
            )
          }));
  
          console.log("Obra:", obra);
          console.log("Obras donde cae la función:", obra);
          console.log("Imprimir esto para la obra:", obra._id)
          console.log("Rampas cercanas:", rampasCercanas);
          matchesArray.push(...rampasCercanas.map((rampa) => ({ obra: obra._id, rampa: rampa.rampa, distance: rampa.distance })));
  console.log("Imprimir esto:", obra._id, rampasCercanas);
        } else {
          console.log("No se encontraron rampas cercanas para la obra:", obra._id);
        }
      });
      
  
  
      console.log("Enviando solicitud POST a /matches...");

      const response = await axios.post("https://2lfj6g4k-3000.brs.devtunnels.ms/matches", {
        
        matchesArray: matchesArray,
      }).catch((error) => {
        console.error('Error en la solicitud POST a /matches:', error);
      });;

      console.log("Respuesta del servidor:", response);
      console.log("Matches en matchesArray:", matchesArray.length);
  
      // Navegar a la pantalla 'Matches' después de obtener la respuesta
      props.navigation.navigate('Matches');
    } catch (error) {
      if (error.response) {
        // El servidor respondió con un código de estado diferente de 2xx
        console.error('Respuesta del servidor:', error.response);
        console.error('Código de estado:', error.response.status);
      } else if (error.request) {
        // La solicitud se hizo pero no se recibió respuesta
        console.error('No se recibió respuesta del servidor');
      } else {
        // Algo sucedió en la configuración de la solicitud que desencadenó un error
        console.error('Error de configuración de la solicitud:', error.message);
      }
    }
  };
  



  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: -33.45694,
      longitude: -70.64827,
      latitudeDelta: 0.1,
      longitudeDelta: 0.1,
        }}
      >

        {obras.map((item, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: parseFloat(item.location.lat),
              longitude: parseFloat(item.location.lng),
            }}
            title={item.direccion}
          >
            <Ionicons name="md-pin" size={30} color="green" />
          </Marker>
        ))}

        {rampas.map((item, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: parseFloat(item.location.lat),
              longitude: parseFloat(item.location.lng),
            }}
            title={item.direccion}
          >
            <Ionicons name="md-pin" size={30} color="blue" />
          </Marker>
        ))}

      </MapView>
      {role === '2' ? <TouchableOpacity style={styles.greenCircleTouchable} onPress={findMatches}>
        <View>
          <Image source={matches} />
          <Text style={styles.matchtext}>Match!</Text>
        </View>
      </TouchableOpacity>: null}
    </View>
  );
          }
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  greenCircleTouchable: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: 'green',
    borderRadius: 30,
    padding: 15,
  },
  matchtext: {
    color: 'white',
    textAlign: 'center',
  },
});

export default MapaconRampasyObras;