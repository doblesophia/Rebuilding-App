import { View, TextInput, Button, Alert, ImageBackground, Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import * as Font from 'expo-font';
import React, { useState, useEffect } from 'react';
import backgroundImage from '../assets/fondo.png';
import logo from '../assets/logo.png';
import { Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage';



const screenWidth = Dimensions.get('window').width;
const scaleFactor = screenWidth / 360; // asumimos que el diseño en Figma es para 360 de ancho

const scale = (size) => size * scaleFactor;


const LoginComponent = (props) => {
  const navigation = useNavigation()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

const handleLogin = async () => {
  console.log("PASA POR EL LOGIN");
 
  try {
    // Realizar una llamada a la API para autenticar al usuario
    const response = await fetch('https://2lfj6g4k-3000.brs.devtunnels.ms/login', {
      method: 'POST',
      headers: {

        'Content-Type': 'application/json',
        
      },
      body: JSON.stringify({
       email,
       password,
      }),
    });
    console.log(response)
    

    // Verificar si la llamada fue exitosa (código de respuesta 200-299)
    if (response.ok) {
      
      const responseData = await response.json()
      const token = responseData.token
      console.log(token)
      const user = responseData.user
      console.log(user)
      const role = user.role
      console.log(role)
      const correo = user.email
      console.log(correo)
      if (role === 1) {
      nombre = user.nombreEmpresa}
      else if(role === 0 || role === 2){
        nombre = user.nombre 
      }
      const userId = user._id
      console.log(userId)
      const apellido = user.apellido
      console.log(apellido)

        await AsyncStorage.setItem('userToken', token);
        await AsyncStorage.setItem('userRole', role.toString());
        await AsyncStorage.setItem('userCorreo', correo)
        await AsyncStorage.setItem('nombreEmpresa', nombre)
        await AsyncStorage.setItem('userId', userId)
        await AsyncStorage.setItem('nombre', nombre)
        await AsyncStorage.setItem("apellido", apellido)
      

    
      if (role === 0 || role === 1) {
        // Roles 0 y 1 van al "lobby"
        navigation.navigate('Menú'); // Cambia 'Lobby' con el nombre de la pantalla de lobby
      } else if (role === 2) {
        // Rol 2 va a la página de "match"
        navigation.navigate('Menú'); // Cambia 'Match' con el nombre de la pantalla de match
      } else {
        // Otros roles pueden manejar de manera diferente
        console.error('Rol no válido');
      }
    } else {
      // Si la autenticación falla, puedes manejar el error de alguna manera
      const errorData = await response.json();
  console.error('Error de autenticación:', errorData.message);
  console.error('Detalles de la respuesta:', response.status, errorData);
  Alert.alert('Error de autenticación', errorData.message);
    }
  } catch (error) {
    console.error('Error al realizar la llamada a la API', error);
  }
}

  
  return (
    <ImageBackground source={backgroundImage} style={styles.background}>
      
      {/* Overlay semi-transparente */}
      <View style={styles.overlay} />

      {/* Contenido */}
      <View style={styles.content}>
        
        <Image source={logo} style={styles.logo} />
        <Text style={styles.loginText}>Iniciar Sesión</Text>
        
        <TextInput
          style={styles.input} // para el input de usuario
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          style={styles.passwordInput} // para el input de contraseña
          placeholder="Contraseña"
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />
                
      {
      //<TouchableOpacity onPress={() => { /* Aquí irá la lógica para navegar a la otra pantalla cuando esté definida */ }}>
      //</TouchableOpacity>  </View><Text style={styles.forgotPasswordText}>¿Olvidaste tu contraseña?</Text>
      //</TouchableOpacity>
      }
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.buttonText}>ENTRAR</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => props.navigation.navigate('Regístrate como vecino')} >
          <Text style={styles.registerText}>
            ¿No tienes cuenta?{'\n'}¡Registrate como vecino!
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => props.navigation.navigate('Registra tu constructora')}>
          <Text style={styles.registerText}>
            ¡Registra tu constructora!
          </Text>
        </TouchableOpacity>

      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
  },

  forgotPasswordText: {
    width: scale(165.986),
    height: scale(20),
    color: '#FFF',
    textAlign: 'center',
    fontSize: scale(12),
    fontWeight: '500',
    lineHeight: scale(21.942),
    marginTop: scale(21),
    marginBottom: scale(22),
  },

  registerText: {
    width: scale(220.717),
    height: scale(39),
    color: '#FFF',
    textAlign: 'center',
    fontSize: scale(13),
    fontWeight: '400',
    lineHeight: scale(19.5),
    marginTop: scale(10),
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#181818',
    opacity: 0.5,
  },

  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: scale(16),
    marginTop: scale(-41)
  },

  logo: {
    width: scale(102.28),
    height: scale(89),
    marginBottom: scale(50),
    marginTop: scale(-31)
  },

  input: {
    height: scale(33),
    width: scale(224.306),
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: scale(10),
    paddingLeft: scale(8),
    backgroundColor: 'white',
    borderRadius: scale(10),
  },

  passwordInput: {
    height: scale(33),
    width: scale(224.306),
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: scale(10),
    paddingLeft: scale(8),
    backgroundColor: 'white',
    borderRadius: scale(10),
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(0, 0, 0, 0.25)',
        shadowOffset: { width: scale(-2), height: scale(2) },
        shadowOpacity: 0.5,
        shadowRadius: scale(2),
      },
      android: {
        elevation: scale(5),
      }
    })
  },

  loginText: {
    color: '#FFF',
    textAlign: 'center',
    fontSize: scale(14),
    fontWeight: 'bold',
    lineHeight: scale(20.479),
    textTransform: 'uppercase',
    marginBottom: scale(15),
    width: scale(246.736),
    height: scale(34),
    justifyContent: 'center',
  },

  loginButton: {
    width: scale(110.358),
    height: scale(33),
    backgroundColor: '#39A3E8',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: scale(10),
    marginTop: scale(22)
  },

  buttonText: {
    color: '#FFF',
    fontSize: scale(14),
    fontWeight: 'bold',
    textAlign: 'center'
  }
});

export default LoginComponent;
