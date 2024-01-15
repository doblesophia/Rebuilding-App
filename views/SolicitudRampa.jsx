import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, ScrollView, TouchableOpacity, Image, Modal } from 'react-native'
import AccessDropdown from '../components/AccessDriopdown';
import ImagenPerfil from './../assets/imagenprofile1.png';
import cameraImage from './../assets/camara.png';
import calendarIcon from './../assets/calendar.png';
import Rampa from './../assets/RAMPA.png';
import { registerTranslation } from 'react-native-paper-dates';
import { useRoute } from '@react-navigation/native';
import CalendarPicker from 'react-native-calendar-picker'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';




// Registra las traducciones para español
registerTranslation('es', {
  save: 'Guardar',
  selectSingle: 'Seleccionar fecha',
  selectMultiple: 'Seleccionar fechas',
  selectRange: 'Seleccionar período',
  notAccordingToDateFormat: (inputFormat) =>
    `El formato de fecha debe ser ${inputFormat}`,
  mustBeHigherThan: (date) => `Debe ser posterior a ${date}`,
  mustBeLowerThan: (date) => `Debe ser anterior a ${date}`,
  mustBeBetween: (startDate, endDate) =>
    `Debe estar entre ${startDate} - ${endDate}`,
  dateIsDisabled: 'Día no permitido',
  previous: 'Anterior',
  next: 'Siguiente',
  typeInDate: 'Escribir fecha',
  pickDateFromCalendar: 'Seleccionar fecha del calendario',
  close: 'Cerrar',
});

const screenWidth = 400;
const imageHeight = 195;

const SolicitudRampa = (props) => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('')
  const [telefono, setTelefono] = useState('');
  const [correo, setCorreo] = useState('');
  const [observacion, setObservacion] = useState('');
  const [area, setArea] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [calendarVisible, setCalendarVisible] = useState(false);
  const [unidadVecinal, setUnidadVecinal] = useState("")
  const [rampas, setRampas] = useState([]);

  const handleAreaChange = (newArea) => {
    setArea(newArea);
  };
  const handleModalClose = () => {
    setCalendarVisible(false);
  };
  const handleShowDatePicker = () => {
    setCalendarVisible(true);
  };

  const onDateChange = (date) => {
    setSelectedDate(date);
  };
  const route = useRoute()
  const {direccionRampa, lugarId, location} = route.params

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
      
    } catch (error) {
      console.error('Error al verificar la sesión:', error);
    }
  };

  useEffect(() => {
    checkSession();
  }, []);

  const handleEnviar = async () => {
    try {
        // if (!coordenadas || coordenadas.length === 0) {
        //   console.error('Error: Coordenadas no válidas');
        //   return;
        // }
        const direccionId = lugarId;
        console.log("Hola, este es el consolelog de la dirección", direccionRampa);
        console.log("soy el id de la direccion", direccionId)
        
        const response = await axios.post("https://2lfj6g4k-3000.brs.devtunnels.ms/rampas", {

       
          direccionRampa,
          nombre,
          telefono,
          correo,
          observacion,
          area,
          selectedDate,
          unidadVecinal, 
          location:{
            lat: location.latitude,
            lng: location.longitude
          }
        } )
        console.log('Respuesta del servidor al crear la rampa:', response.data);
        if (response && response.data) {
        console.log("ubicación rampa:",response.data)
          
          props.navigation.navigate('Ubicaciones');
        } else {
          // La respuesta no es válida o no tiene un cuerpo JSON
          console.error('Error: Respuesta no válida');
        }

        setRampas((prevRampas) => [...prevRampas, response.data.response]);
        console.log("rampas:", rampas)
        props.navigation.navigate('Ubicación de Rampa');
      } catch (error) {
        console.error('Error:', error.message);
if (error.response) {
  // La solicitud se hizo y el servidor respondió con un código de estado diferente de 2xx
  console.error('Respuesta del servidor:', error.response.data);
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
  useEffect(() => {
    console.log('Estado de rampas actualizado:', rampas);
  }, [rampas]);
  const handleDateChange = (newDate) => {
    console.log(newDate);
    setSelectedDate(newDate);
    setShowDatePicker(false);
  };
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>

      <View style={styles.imagePlaceholder}>
        <Image source={ImagenPerfil} style={styles.image} resizeMode="contain" />
        <View style={styles.circle}>
          <Image source={cameraImage} style={styles.cameraIcon} resizeMode="contain" />
        </View>
      </View>

      <View style={styles.inputContainer}>
      <View style={styles.nombreConstructoraContainer}>
        <Text style={styles.nombreConstructoraTexto}>
            Nombre:
        </Text>
        <Text style={styles.nombreConstructoraTexto}>
            {nombre} {apellido}
        </Text>
        </View>
        <TextInput
          style={styles.input}
          placeholder="Telefono"
          value={telefono}
          onChangeText={(text) => setTelefono(text)}
        />
        <View style={styles.nombreConstructoraContainer}>
        <Text style={styles.nombreConstructoraTexto}>
            Correo Electrónico:
        </Text>
        <Text style={styles.nombreConstructoraTexto}>
            {correo}
        </Text>
        </View>
        <TextInput
          style={styles.input}
          placeholder="Unidad Vecinal"
          value={unidadVecinal}
          onChangeText={(text) => setUnidadVecinal(text)}
        />
        <Text style={styles.addressText}>{direccionRampa}</Text>
      </View>

      <AccessDropdown imageSource={Rampa} onAreaChange={handleAreaChange} />

      <View style={styles.blackBox}>
        <Text style={styles.blackBoxText}>¿Cuándo Retirar?</Text>
    </View>
    <TouchableOpacity onPress={handleShowDatePicker}>
        <Image source={calendarIcon} style={styles.calendarImage} resizeMode="contain" />
      </TouchableOpacity>

      <Modal
        transparent={false}
        visible={calendarVisible}
        onRequestClose={handleModalClose}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <CalendarPicker
            onDateChange={onDateChange}
            style={styles.calendar}
          />
    
          {selectedDate && (
            <TouchableOpacity onPress={handleModalClose}>
              <Text style={{ color: 'blue', marginTop: 10 }}>
                Cerrar calendario y guardar fecha seleccionada
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </Modal>

      <View style={styles.whiteBox}>
        <TextInput 
          style={styles.updatedLongInput} 
          placeholder="Ingresa tus observaciones aquí..." 
          multiline 
          value={observacion} 
          onChangeText={setObservacion} />
      </View>

       <TouchableOpacity style={styles.sendButton} onPress={handleEnviar}>
        <Text style={styles.sendButtonText}>Enviar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  selectedDateText: {
    color: '#FFF', // Puedes ajustar el color según tu diseño
    marginLeft: 10, // Puedes ajustar el espaciado según tu diseño
  },
  addressText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#444',
    marginBottom: 20,
    marginTop: 20.   
  }, 
  container: {
    flex: 1,
    padding: 15,
  },
  contentContainer: {
    alignItems: 'center',
  },
  sendButton: {
    width: 229,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#39A3E8',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  sendButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  image: {
    width: screenWidth,
    height: imageHeight,
    resizeMode: 'cover',
  },
  imagePlaceholder: {
    width: '100%',
    height: 200,
    borderColor: 'gray',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    overflow: 'visible',
  },
  cameraIcon: {
    width: 25.266,
    height: 21.846,
  },
  circle: {
    width: 63,
    height: 63,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#FFF',
    backgroundColor: '#39A3E8', // Color azul solicitado
    boxShadow: '0px 0px 10px 0px rgba(0, 0, 0, 0.25)',
    position: 'absolute',
    bottom: -31.5,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 30,
  },
  input: {
    width: '100%',
    height: 40,
    color: '#696969',
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '500',
    borderBottomWidth: 1,
    borderBottomColor: '#696969',
  },
  blackBox: {
    width: '100%',
    height: 55,
    backgroundColor: 'rgba(32, 33, 33, 0.90)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 15,
    paddingRight: 67,
    marginTop: 20,
  },
  blackBoxText: {
    color: 'white',
  },
  calendarImage: {
    width: 20,
    height: 19,
  },
  whiteBox: {
    width: 360,
    height: 260,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  updatedLongInput: {
    width: 317,
    height: 163,
    backgroundColor: '#E3E3E3',
    borderRadius: 10,
    textAlignVertical: 'top',
    padding: 10,
  },
});

export default SolicitudRampa;