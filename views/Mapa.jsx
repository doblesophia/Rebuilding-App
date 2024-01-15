import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import React, { useEffect, useState, useRef } from 'react'
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import MapViewDirections from 'react-native-maps-directions';
import {GOOGLE_MAPS_KEY} from "@env";
import * as Location from "expo-location"
import rcd from "../assets/RCD.png"
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';


const Mapa = (props) => {
  
  const [searchText, setSearchText] = useState("")
  const [results, setResults] = useState([])
  const [selectedLocation, setSelectedLocation] = useState({
    latitude: 0,
    longitude: 0,
  });
  const map = useRef(null)
  const [origin, setOrigin] = useState({
    latitude: -33.45694,
    longitude: -70.64827
  })

  const [destination, setDestination] = useState({
    latitude: -33.616667,
    longitude: -70.57577
  })

  useEffect(() => {
    checkSession();
  }, []);

  const checkSession = async () => {
    try {
      
      const userToken = await AsyncStorage.getItem('userToken');
      const correo = await AsyncStorage.getItem('userCorreo');
      const nombreEmpresa = await AsyncStorage.getItem('nombreEmpresa');
      const empresaId = await AsyncStorage.getItem('userId')
     
      console.log(correo)
      console.log(nombreEmpresa)
      console.log(empresaId)
      
      
      
      if (!userToken) {
        props.navigation.navigate('Inicia sesión'); 
      }
      
    } catch (error) {
      console.error('Error al verificar la sesión:', error);
    }
  };

  
  useEffect(()=> {
    getLocationPermission()
  }, [])
  async function getLocationPermission(){
    let {status} = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      alert ("Permiso denegado");
      return
    }
    let location = await Location.getCurrentPositionAsync({});
    const current ={
      latitude: location.coords.latitude,
      longitude: location.coords.longitude
    }

    setOrigin(current);
  }
  const handleAgregarResiduos = () => {
    if (results.length > 0) {
      const selectedPlace = results[0];
      const selectedAddress = selectedPlace.formatted_address;
      const selectedPlaceId = selectedPlace.place_id;
  
      console.log('Direccion a enviar:', selectedAddress);
      console.log('ID del lugar:', selectedPlaceId);
      console.log('Coordenadas:', selectedLocation);
  
      props.navigation.navigate('Agregar residuos', {
        direccion: selectedAddress,
        lugarId: selectedPlaceId,
        location: selectedLocation,
      });
    } else {
      console.error('No hay resultados de búsqueda');
    }
  };

  const searchPlaces = async () => {
 if (!searchText.trim().length) return;

 const googleApiUrl = "https://maps.googleapis.com/maps/api/place/textsearch/json"
    const input = searchText.trim()
    const location = `-33.45694,-70.64827&radius=2000` 
    const url = `${googleApiUrl}?query=${input}&location=${location}&key=${GOOGLE_MAPS_KEY}`
    try {
      const resp = await fetch(url)
      const json = await resp.json()
      console.log(json.results)
      if (json && json.results){
        const coords = [];

        for ( const item of json.results){
          
          coords.push({
            latitude: item.geometry.location.lat,
            longitude: item.geometry.location.lng
          })
          console.log(item.name)
          console.log(item.geometry)
        }
        
        setResults(json.results)
        if (coords.length && map.current) {
        map.current?.fitToCoordinates(coords, {
          edgePadding: {
            top: 50,
            right: 50,
            bottom: 50,
            left: 50
          },
          animated: true
        })
          }
      }

      setSelectedLocation({
        latitude: json.results[0].geometry.location.lat,
        longitude: json.results[0].geometry.location.lng,
      });
      const response = await axios.post("https://2lfj6g4k-3000.brs.devtunnels.ms/obras/direcciones", 
       {
         direccion: json.results[0].formatted_address,
       location: {
        lat: json.results[0].geometry.location.lat,
        lng: json.results[0].geometry.location.lng
      }}

       
      )
      console.log(response)

    
      
    } catch (error) {
      console.error("Axios Error:", error.response ? error.response.data : error.message)
    }
  }
  
 

  return (
    <View>
      
        <MapView 
          ref={map}
          provider={PROVIDER_GOOGLE}
          style={styles.map} 
          initialRegion={{
          latitude: origin.latitude,
          longitude: origin.longitude,
          latitudeDelta: 0.09,
          longitudeDelta: 0.03
        }}>
      
        
          {results.length
            ? results.map((item, i) => {
              const coord = {
                latitude: item.geometry.location.lat,
                longitude: item.geometry.location.lng
              };
              return (
                <Marker
                  key={`search-item-${i}`}
                  coordinate={coord}
                  title={item.name}
                  description=''
                  />
              )
            }): null
          
          }
          {/* <Polyline 
          coordinates={[origin, destination]}
          strokeColor='pink'
          strokeWidth={6}/> */}
          {/* <MapViewDirections
          origin={origin}
          destination={destination}
          apikey={GOOGLE_MAPS_KEY}
          strokeWidth={3}/> */}

        
        </MapView>
        
        <View style={styles.searchBox}>
 
            <TextInput 
            style={styles.searchBoxField}
            placeholder='Busca tu dirección aquí'
            onChangeText={setSearchText}
            autoCapitalize='sentences'
            />
            <TouchableOpacity 
            style={styles.buttonContainer}
            onPress={searchPlaces}
            >
              <Text style={styles.buttonLabel}>
                Búsqueda
              </Text>
            </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.greenCircleTouchable} onPress={handleAgregarResiduos}>
        <View style={styles.circleGreenImage}>
          <Image source={rcd} style={styles.circleGreenImage} />
        </View>
      </TouchableOpacity>
  
       
        
    </View>
  )
}

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "100%"
  },
  searchBox: {
    position: "absolute",
    width: "90%",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#aaa",
    backgroundColor: "white",
    padding: 8,
    alignSelf: "center",
    marginTop: 0,
    height: 95
  },
  searchBoxField:{
    borderColor: "#777",
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    fontSize: 15,
    marginBottom: 8
  },
  buttonContainer:{
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
    backgroundColor: "#26f",
    borderRadius: 8,
    height: 30
  },
  buttonLabel: {
    fontSize: 10,
    color: "white"
  },
  circleBottomLeft: {
    position: 'absolute',
    width: 78,
    height: 78,
    top: 300,
    left: 50,
},
circleBottomLeftContainer: {
  position: 'absolute',
  width: 78,
  height: 78,
  top: 0,
  left: 50,
  alignItems: 'center',  // Centra los elementos hijos horizontalmente
  justifyContent: 'center',  // Centra los elementos hijos verticalmente
},
circleBottomLeftImage: {
  width: 25,  // Puedes ajustar según necesites
  height: 23,  // Puedes ajustar según necesites
  zIndex: 2,
},
greenCircleTouchable: {
  width: 70,
  height: 70,
  borderRadius: 70 / 2,
  backgroundColor: '#44B03E',
  position: 'absolute',
  bottom: 57,
  right: 22,
  zIndex: 1,
  borderWidth: 2,
  borderColor: 'white',
},
circleGreenImage: {
  width: 45,
  height: 45,
  resizeMode: 'contain',
  alignSelf: 'center',
  marginTop: 5,
},
})
export default Mapa
