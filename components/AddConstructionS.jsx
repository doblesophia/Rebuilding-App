import React, { useState, useEffect } from 'react'
import { Image, ScrollView, StyleSheet, View, Dimensions, TextInput, Text, TouchableOpacity, Alert, Modal } from 'react-native'
import imagenProfile1 from "../assets/imagenprofile1.png"
import cameraIcon from "../assets/camara.png"
import DropdownForm from './DropdownForm'
import hormigon from "../assets/Hormigon.png"
import madera from "../assets/Madera.png"
import calendarIcon from "../assets/calendar.png"
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import CalendarPicker from 'react-native-calendar-picker'
import { useRoute } from '@react-navigation/native'

const imageWidth = 400; // O el ancho que desees
const imageHeight = 195;
const screenWidth = Dimensions.get('window').width;

const AddConstructionS = (props) => {
    const [telefono, setTelefono] = useState("")
    const [correo, setCorreo] = useState("")
    const [hormigonV, setHormigon] = useState(null)
    const [maderaV, setMadera] = useState(null)
    const [selectedDate, setSelectedDate] = useState(null)
    const [observacion, setObservacion] = useState("")
    const [calendarVisible, setCalendarVisible] = useState(false);
    const [nombreEmpresa, setNombreEmpresa] = useState("")
    const [personas, setPersonas] = useState(0)
    const [unidadVecinal, setUnidadVecinal] = useState(0)
    const [tipoDeConstruccion, setTipoDeConstruccion] = useState("")
    const [rubroConstruccion, setRubroConstruccion] = useState("")
    const route = useRoute()
    const {direccion, lugarId, location} = route.params
    console.log("location",location)

    console.log(direccion, lugarId)
  
    const checkSession = async () => {
      try {
        
        const userToken = await AsyncStorage.getItem('userToken');
        console.log(userToken)
        
        
        if (!userToken) {
          props.navigation.navigate('Inicia sesión'); 
        }

      const correo = await AsyncStorage.getItem('userCorreo');
      const nombreEmpresa = await AsyncStorage.getItem('nombreEmpresa');
      const empresaId = await AsyncStorage.getItem('userId')

      setCorreo(correo)
      setNombreEmpresa(nombreEmpresa)
      console.log(correo)
      console.log(nombreEmpresa)
      console.log(empresaId)
        
      } catch (error) {
        console.error('Error al verificar la sesión:', error);
      }
    };

    useEffect(() => {
   checkSession()
    }, [])
    

    useEffect(() => {
      (async () => {
        const { status } = await Calendar.requestCalendarPermissionsAsync();
        if (status === 'granted') {
          const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);
          console.log('Here are all your calendars:');
          console.log({ calendars });
        }
      })();
    }, []);
      const handleVolumenChange = (newVolumen, materialType) => {
        // Actualizar el estado según el tipo de material
        switch (materialType) {
          case 'hormigon':
            setHormigon(newVolumen);
            console.log(materialType, newVolumen);
            break;
          case 'madera':
            setMadera(newVolumen);
            console.log(materialType, newVolumen);
            break;
          // Agregar más casos según sea necesario
          default:
            break;
        }
      };

      

    const handleEnviar = async () => {
        try {

          // }
          const direccionId = lugarId;
          console.log(direccion);
          console.log(direccionId)
          
          const response = await axios.post("https://2lfj6g4k-3000.brs.devtunnels.ms/obras", {

         
            direccion,
            nombreEmpresa,
            telefono,
            correo,
            observacion,
            hormigonV,
            maderaV,
            selectedDate,
            location:{
              lat: location.latitude,
              lng: location.longitude
            },
            personas,
            unidadVecinal,
            tipoDeConstruccion,
            rubroConstruccion
          } )

          if (response && response.data) {
            // La respuesta es válida y tiene un cuerpo JSON
            if (!nombreEmpresa) {
              console.error('Error: nombreEmpresa es undefined');
              return;
            }
              props.navigation.navigate('Ubicaciones');
        
            
          } else {
            // La respuesta no es válida o no tiene un cuerpo JSON
            console.error('Error: Respuesta no válida');
          }
    
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

      const onDateChange = (date) => {
        setSelectedDate(date);
      };
     
      const handleDatePress = () => {
        setCalendarVisible(true)
      };

      const handleModalClose = () => {
        setCalendarVisible(false);
      };


  return (
    <ScrollView style={styles.container}>
        <View style={styles.imagePlaceholder}>
            <Image source={imagenProfile1} style={styles.image}/>
            <View style={styles.circle}>
                <Image source={cameraIcon} style={styles.cameraIcon}/>
            </View>
        </View>
        <View style={styles.nombreConstructoraContainer}>
        <Text style={styles.nombreConstructoraTexto}>
            Nombre de la Constructora:
        </Text>
        <Text style={styles.nombreConstructoraTexto}>
            {nombreEmpresa}
        </Text>
        </View>
        <TextInput
        style={styles.input}
        placeholder="Teléfono"
        value={telefono}
        onChangeText={(text) => setTelefono(text)}
      />


<View style={styles.nombreConstructoraContainer}>
        <Text style={styles.nombreConstructoraTexto}>
            Correo electrónico:
        </Text>
        <Text style={styles.nombreConstructoraTexto}>
            {correo}
        </Text>
        </View>

        <View style={styles.nombreConstructoraContainer}>
        <Text style={styles.nombreConstructoraTexto}>
            Dirección:
        </Text>
        <Text style={styles.nombreConstructoraTexto}>
            {direccion}
        </Text>
        <TextInput
        style={styles.input}
        placeholder='Personas de la obra'
        value={personas}
        onChangeText={(text)=>setPersonas(text)}
        /> 
        <TextInput
        style={styles.input}
        placeholder='Unidad Vecinal'
        value={unidadVecinal}
        onChangeText={(text)=>setUnidadVecinal(text)}
        /> 
        <TextInput
        style={styles.input}
        placeholder='Tipo de Construcción'
        value={tipoDeConstruccion}
        onChangeText={(text)=>setTipoDeConstruccion(text)}
        /> 
         <TextInput
        style={styles.input}
        placeholder='Rubro de Construcción'
        value={rubroConstruccion}
        onChangeText={(text)=>setRubroConstruccion(text)}
        /> 
        </View>
       <Text style={styles.centeredText}>Residuos a Ofertar:</Text>
       <DropdownForm style={styles.contenedoresDesplegables} title="Hormigón" imageSource={hormigonV} onVolumenChange={(newVolumen) => handleVolumenChange(newVolumen, 'hormigon')} />
      <DropdownForm style={styles.contenedoresDesplegables} title="Madera" imageSource={maderaV} onVolumenChange={(newVolumen) => handleVolumenChange(newVolumen, 'madera')} />
      
      <View style={styles.blackBox}>
      <Text style={styles.blackBoxText}>¿Cuándo Retirar?</Text>

      <TouchableOpacity onPress={handleDatePress}>
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

      
    </View>
      <View style={styles.whiteBox}>
      {selectedDate && (
        <Text style={styles.textoCalendar}>Fecha seleccionada: </Text>
      )}
      <Text style={styles.textoCalendar}>{selectedDate ? selectedDate.toString() : 'Fecha no seleccionada'}</Text>
        <TextInput
          style={styles.updatedLongInput}
          placeholder="Comenta sobre los Residuos de Construcción y Demolición"
          multiline
          value={observacion}
          onChangeText={(text) => setObservacion(text)}
        />
      </View>
      <TouchableOpacity style={styles.sendButton} onPress={handleEnviar}>
        <Text style={styles.sendButtonText}>Enviar</Text>
      </TouchableOpacity>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        padding: 15,
    },
    image: {
        width: imageWidth,
        height: imageHeight,
      },
      imagePlaceholder: {
        width: '100%',
        height: imageHeight,
        borderColor: 'gray',
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15,
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
        backgroundColor: '#44B03E',
        position: 'absolute',
        bottom: -31.5,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
      },
      nombreConstructoraContainer:{
        justifyContent: "center",
        alignItems: "center",
        paddingTop: 20,
      },
      nombreConstructoraTexto:{
        paddingVertical: 3
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
        marginBottom: 10,
        marginTop:10,
      },
      centeredText:{
        color: '#202121',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 20,
    marginTop: 15
      },
      contenedoresDesplegables: {
        padding: 5,
        alignSelf: "center"
      },
      blackBox:{
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
      blackBoxText:{
        color: "white"
      },
      calendarImage:{
        width: 20,
    height: 19,
      },
    selectedDateText:{
    color: '#FFF', 
    marginLeft: 10
    },
    whiteBox:{
        width: 360,
    height: 260,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 30
    },
    updatedLongInput:{
        width: 317,
    height: 163,
    backgroundColor: '#E3E3E3',
    borderRadius: 10,
    textAlignVertical: 'top',
    padding: 10,
    },
    sendButton: {
        width: 229,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#44B03E',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
    marginLeft: 50
    },
    textoCalendar:{
      color: "black",
      fontsize: 10
    }
})
export default AddConstructionS
