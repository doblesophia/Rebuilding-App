import React, { useState } from 'react';
import { Image, ImageBackground, StyleSheet, Text, TextInput, Dimensions, TouchableOpacity, View } from 'react-native';
import fondo from '../assets/fondo.png';
import logo from '../assets/logo.png';
import axios from 'axios';

const screenWidth = Dimensions.get('window').width;
const scaleFactor = screenWidth / 360;

const scale = (size) => size * scaleFactor;

const RegisterConstructora = (props) => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [nombreEmpresa, setNombreEmpresa] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = () => {
    // Construir el objeto de datos a enviar en la solicitud POST
    const postData = {
      nombre,
      apellido,
      nombreEmpresa,
      email,
      password,
      confirmPassword,
    };

    // Reemplazar la URL con la dirección de tu servidor de registro
    const apiUrl = 'https://2lfj6g4k-3000.brs.devtunnels.ms/registerempresa';

    // Realizar la solicitud POST usando Axios
    axios.post(apiUrl, postData)
      .then(response => {
        // Manejar la respuesta exitosa aquí
        console.log('Respuesta del servidor:', response.data);
        // Puedes agregar más lógica aquí, por ejemplo, redirigir a otra pantalla
      })
      .catch(error => {
        // Manejar errores aquí
        console.error('Error al realizar la solicitud:', error);
      });
  };
    
    
  return (
    <ImageBackground source={fondo} style={styles.background}>
        <View style={styles.overlay} />
        <Image source={logo} style={styles.logo}/>
        <Text style={styles.registra}>
            Registra tu constructora
        </Text>
        <View style={styles.formulario}>
      <TextInput placeholder="Nombre" style={styles.input} value={nombre} onChangeText={setNombre} />
      <TextInput placeholder="Apellido" style={styles.input} value={apellido} onChangeText={setApellido} />
      <TextInput placeholder="Nombre de la Empresa" style={styles.input} value={nombreEmpresa} onChangeText={setNombreEmpresa} />
      <TextInput placeholder="Email" style={styles.input} value={email} onChangeText={setEmail} />
      <TextInput placeholder="Contraseña" secureTextEntry={true} style={styles.input} value={password} onChangeText={setPassword} />
      <TextInput placeholder="Confirmar Contraseña" secureTextEntry={true} style={styles.input} value={confirmPassword} onChangeText={setConfirmPassword} />
    </View>
    <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
      <Text style={styles.buttonText}>Registrarse</Text>
    </TouchableOpacity>
        {/* <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
          <Text style={styles.buttonText}>Registrarse</Text>
        </TouchableOpacity> */}
        <TouchableOpacity style={styles.botonRegister} onPress={() => props.navigation.navigate('Inicia sesión')}>
          <Text style={styles.hyperlinkText}>
            ¿Ya tienes una cuenta?{'\n'}
            Inicia sesión aquí
          </Text>
        </TouchableOpacity>
        {/* <TouchableOpacity onPress={() => props.navigation.navigate('Login')}>
          <Text style={styles.hyperlinkText}>
            ¿Ya tienes una cuenta?{'\n'}
            Inicia sesión aquí
          </Text>
        </TouchableOpacity> */}
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  registerButton: {
    width: scale(160),
    height: scale(33),
    backgroundColor: '#44B03E',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: scale(10),
    alignSelf: 'center',
    marginTop: scale(22),
  },
  buttonText: {
    color: '#FFF',
    fontSize: scale(14),
    fontWeight: 'bold',
    textAlign: 'center'
  },
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: "center",
    height: "100%",
    width: "100%"
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#181818',
    opacity: 0.5,
  },
  container: {
    flex: 1,
    padding: scale(16),
    justifyContent: 'center',
  },
  input: {
    height: scale(33),
    width: scale(250),  // Actualizado según Figma
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: scale(10),
    paddingLeft: scale(8),
    backgroundColor: 'white',
    borderRadius: scale(10),
    alignSelf: 'center',
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
  logo: {
    width: scale(102.28),
    height: scale(89),
    marginBottom: scale(50),
    marginTop: scale(-31),
    alignSelf: 'center',
  },
  registerText: {
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
    alignSelf: 'center'
  },
  hyperlinkText: {
    width: scale(220.717),
    height: scale(39),
    color: '#FFF',
    textAlign: 'center',
    fontSize: scale(13),
    fontWeight: '400',
    lineHeight: scale(19.5),
    marginTop: scale(10),
    alignSelf: 'center'
  },
  registra:{
    color: "white",
    fontSize: 15,
    fontWeight: "bold"
  }
    }
)

export default RegisterConstructora
