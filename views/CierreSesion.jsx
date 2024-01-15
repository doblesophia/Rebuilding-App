import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Text, TouchableOpacity, View, Button, StyleSheet, ImageBackground, Image } from 'react-native'
import backgroundImage from "../assets/fondo.png"
import logo from "../assets/logo.png"



const CierreSesion = (props) => {
 const [correo, setCorreo] = useState("")
 const [userToken, setUserToken] = useState("")
  const checkSession = async () => {
    try {
      
      const userToken = await AsyncStorage.getItem('userToken');
      const correo = await AsyncStorage.getItem('userCorreo');
      const nombreEmpresa = await AsyncStorage.getItem('nombreEmpresa');
      const empresaId = await AsyncStorage.getItem('userId')
      const role = await AsyncStorage.getItem('userRole')
     
     
      
      setCorreo(correo)
      setUserToken(userToken)
      
      if (!userToken) {
        props.navigation.navigate('Inicia sesión'); 
      }
      
    } catch (error) {
      console.error('Error al verificar la sesión:', error);
    }
  };

  useEffect(() => {
  checkSession()
  }, [])
  
    const handleLogout = async () => {
        try {
            const response = await axios.post('https://2lfj6g4k-3000.brs.devtunnels.ms/signout', { correo },{headers: {
              'Authorization': `Bearer ${userToken}`,
              'Content-Type': 'application/json',
            }},);
            console.log("asdfg", response.data.message);
            console.log("usertoken después",userToken)
        } catch (error) {
            console.error('Error al cerrar sesión:', error.message);
        }
    
        // Redirige a la pantalla de inicio de sesión independientemente del resultado de la solicitud
        props.navigation.navigate("Inicia sesión");
    };
  return (
    <ImageBackground source={backgroundImage} style={styles.background}>
    
    <View style={styles.container}>
    <View style={styles.overlay} />
    <Image source={logo} style={styles.logo}/>
    <Text style={styles.textosArriba}>¿YA TE VAS 😔?</Text>
    <Text style={styles.textoMedio}>Sabemos que aún necesitas tu rampa 😏</Text>
        <Button title="Cerrar Sesión" style={styles.button} onPress={handleLogout} />
      <Text style={styles.textos}>Gracias por tu visita💚💙🤍</Text>
    </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%"
  },
  background: {
    flex: 1,
    justifyContent: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#181818',
    opacity: 0.5,
  },

  textos:{
    color: "white",
    fontSize: 17,
    marginTop: 25,
    position: "absolute",
    bottom: 200
  },
  textosArriba:{
    position: "absolute",
    top: 200,
    fontSize:25,
    color: "white",
    fontWeight: "900"
  },
  textoMedio:{
    color: "white",
    fontSize: 20,
    position: "absolute",
    top: 250,
    textAlign: "center",
    fontWeight: "bold"
  },
 logo:{
  position: "absolute",
  top: 50
 } 
  }
)

export default CierreSesion
