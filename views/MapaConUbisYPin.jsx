import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';
import greenCircle from "../assets/circuloVerde.png"
import axios from 'axios';
import { useNavigation, useRoute } from '@react-navigation/native';

const MapaConUbisYPin = () => {
  const navigation = useNavigation()
  const map = useRef(null);
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://2lfj6g4k-3000.brs.devtunnels.ms/obras/direcciones", {
          headers: {
            Accept: "application/json",
          },
        });

        if (response.data && response.data.direcciones && Array.isArray(response.data.direcciones)) {
          setLocations(response.data.direcciones);
        } else {
          console.error('La respuesta no tiene la estructura esperada:', response.data);
        }
      } catch (error) {
        console.error('Error al obtener ubicaciones desde la API:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    console.log('Locations:', locations);
  }, [locations]);

  if (locations.length === 0) {
    // Muestra un mensaje o componente de carga mientras se obtienen las ubicaciones
    return (
      <View style={styles.container}>
        <Text>Cargando...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>

<TouchableOpacity style={styles.profile} onPress={() => navigation.navigate('Perfil Constructora')}>
        <Image source={greenCircle}/>
  </TouchableOpacity>
    <Text style={styles.perfil}>Perfil</Text>
      <MapView
        ref={map}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: -33.45694,
          longitude: -70.64827,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
      >
        
        {locations.map((item, index) => {
          const location = item.location;

          if (location && typeof location === 'object' && 'lat' in location && 'lng' in location) {
            const latitude = parseFloat(location.lat);
            const longitude = parseFloat(location.lng);

            if (!isNaN(latitude) && !isNaN(longitude)) {
              return (
                <Marker
  key={index}
  coordinate={{
    latitude: latitude,
    longitude: longitude,
  }}
  title={item.direccion}
>
<Ionicons name="md-pin" size={30} color="green" />
</Marker>
              );
            } else {
              console.log('Coordenadas no válidas para el índice', index);
              return null;
            }
          } else {
            console.log('Location no definida o no válida para el índice', index);
            return null;
          }
        })}
       
      </MapView>
    
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  profile:{
    position: "absolute",
    bottom: 30,
    left: 250,
    zIndex: 1,
    borderWidth: 5,
    borderColor: "white",
    borderRadius: 55.5
  },
  perfil:{
    position: "absolute",
    zIndex: 1,
    bottom: 65,
    left: 275,
    fontWeight: "bold"
  }
});

export default MapaConUbisYPin;