import React, { useEffect, useState } from 'react'
import { FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import fondoNegro from "../assets/fondoNegro.png"
import fotoPerfil from "../assets/ImagenPerfil.png"
import camara from "../assets/Group.png"
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'

const PerfilVecino = () => {
const [correo, setCorreo] = useState("")
const [nombre, setNombre] = useState("")
const [apellido, setApellido] = useState("")
const [unidadVecinal, setUnidadVecinal] = useState(0)
const [comuna, setComuna] = useState("")
const [direccion, setDireccion] = useState("")
const [rampas, setRampas] = useState([])

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
    

    setCorreo(correo)
    setNombre(nombre)
    setApellido(apellido)
    console.log(correo)
    console.log(nombre)
    console.log(apellido)
    
      
    } catch (error) {
      console.error('Error al verificar la sesión:', error);
    }
  };

  useEffect(() => {
    checkSession()
  }, [])

  const obtenerRampas = async () => {
    try {
      const resp = await axios.get("https://2lfj6g4k-3000.brs.devtunnels.ms/rampas");
      const perfiles = resp.data.rampa;
  
      console.log("Respuesta completa:", perfiles);
  
      const perfilEncontrado = perfiles.find((perfil) => {
        console.log("Nombre y comuna en el perfil:", perfil.nombre, perfil.comuna);
        return perfil.nombre === nombre && perfil.comuna !== undefined;
      });
  
      console.log("perfilencontrado", perfilEncontrado);
  
      if (perfilEncontrado) {
        const { _id, unidadVecinal, comuna, direccionRampa } = perfilEncontrado;
        console.log("Unidad Vecinal:", unidadVecinal);
        console.log("Comuna:", comuna);
        console.log("Dirección:", direccionRampa);
  
        const perfilYaAgregado = rampas.some((perfil) => perfil._id === _id);
  
        if (!perfilYaAgregado) {
          setRampas((prevRampas) => [...prevRampas, perfilEncontrado]);
        } else {
          console.log("El perfil ya está en la lista.");
        }
      }
    } catch (error) {
      console.log("Error al buscar perfil de vecinos:", error);
    }
  };

  useEffect(() => {
   obtenerRampas() 
  }, [])
  
  
  return (
    <View>
      <View>
        <Image source={fondoNegro}/>
        
        <View style={styles.circulo}>
                <Image source={fotoPerfil} style={styles.circuloFoto}/>
                
                <View style={styles.lapiz}>

                </View>
                <Image source={camara} style={styles.camaraCirculo}/>
        </View>
      </View>
      <View style={styles.containerTitulo}>
                <Text style={styles.titulo}>
                    {nombre} {apellido}
                </Text> 
            </View>
            <Text style={styles.textoCorreo}>Correo electrónico:</Text>
            <Text style={styles.correo}>{correo}</Text>
            {console.log("rampas antes del flatlist", rampas)}
            <FlatList
  keyExtractor={(item) => (typeof item === 'string' ? item : item._id)}
  data={rampas}
  renderItem={({ item }) => {
    console.log('Entrando a renderItem:', item);
    return (
      <View style={styles.inputs}>
         {typeof item === 'string' ? (
          <Text>{item}</Text>
        ) : (
          <>
            <Text style={styles.texto}>Comuna:</Text>
            <Text>{item.comuna}</Text>
            <Text style={styles.texto}>Unidad Vecinal:</Text>
            <Text>{item.unidadVecinal}</Text>
            <Text style={styles.texto}>Dirección:</Text>
            <Text>{item.direccionRampa}</Text>
          </>
        )}
      </View>
    );
  }}
/>
     
      

    </View>
  )
}

const styles = StyleSheet.create({
  circulo:{
    height: 100,
    width: 100,
    backgroundColor: "white",
    borderRadius: 55,
    position: "absolute",
    left: 130,
    top: 70,
    
},
circuloFoto:{
    height: 100,
    width: 100,
    backgroundColor: "white",
    borderRadius: 55,
    position: "absolute",
    borderColor: "white",
    borderWidth:5
},
lapiz:{
    width: 30,
    height: 30,
    backgroundColor: "gray",
    position: "absolute",
    right: 45,
    borderRadius: 50,
    borderColor: "white",
    borderWidth: 3,
    bottom: 80
},
camaraCirculo:{
  position: "absolute",
  left: 33,
  bottom: 90
},
editatuperfil:{
  color: "white",
  zIndex: 1,
  position: "absolute",
  top: 25,
  left: 110,
  fontWeight: "bold",
  fontSize: 20
},
textInput:{
borderColor: "black",
height: 50
},
inputs: {
  width: "100%",
  height: 220,
  left: 5,
  position: "relative",
  top: 50
},
texto:{
  fontWeight: "bold"
},
containerTitulo:{
  display: "flex",
  justifyContent: "center",
  position: "absolute",


},
titulo:{
  fontSize: 30,
  fontWeight: "900",
  position: "absolute",
  top: 265,
  left: 5
     
},
textoCorreo:{
fontSize: 16,
fontWeight: "bold",
top: 40,
left: 5
},
correo: {
  position: "relative",
  top: 40,
  left: 5 
}
})

export default PerfilVecino
