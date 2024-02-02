import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity, Button, TextInput, ScrollView, FlatList} from 'react-native'
import Modal from "react-native-modal"
import fondo from "../assets/fondoNegro.png"
import fotoPerfil from "../assets/ImagenPerfil.png"
import circuloCamara from "../assets/Ellipse 7.png"
import camara from "../assets/Group.png"
import axios from 'axios'
import { useRoute } from '@react-navigation/native'
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage'
import cloudinaryConfig from '../cloudinary/cloudinaryConfig.js'
import { encode } from 'base-64'

const SlideConstructora = ()  => {

const [isModalVisible, setModalVisible] = useState(false);
const [unidadVecinal, setUnidadVecinal] = useState (0)
const [personas, setPersonas] = useState(0)
//const [direccion, setDireccion] = useState("")
const [tipoDeConstruccion, setTipoDeConstruccion] = useState("Ej.Edificio")
const [rubroConstruccion, setRubroConstruccion] = useState("Ej.Habitacional")
const [rampas, setRampas] = useState(0)
const [nombreEmpresa, setNombreEmpresa] = useState("")
const [obraId, setObraId] = useState("")
const [hormigonV, setHormigonV] = useState(0)
const [direccion, setDireccion] = useState("")
const [correo, setCorreo] = useState("")
const [nombre, setNombre] = useState("")
const [apellido, setApellido] = useState("") 
const [obras, setObras] = useState([]) 
const [modalPersonas, setModalPersonas] = useState(0);
const [modalUnidadVecinal, setModalUnidadVecinal] = useState(0);
const [modalTipoConstruccion, setModalTipoConstruccion] = useState("Ej.Edificio");
const [modalRubroConstruccion, setModalRubroConstruccion] = useState("Ej.Habitacional");
const [selectedPerfilObra, setSelectedPerfilObra] = useState(null);
const [unidadesVecinales, setUnidadesVecinales] = useState(0)
const [imageUrl, setImageUrl] = useState("")

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
    const nombreEmpresa = await AsyncStorage.getItem('nombreEmpresa')

    setCorreo(correo)
    setNombre(nombre)
    setApellido(apellido)
    setNombreEmpresa(nombreEmpresa)
    console.log(correo)
    console.log(nombre)
    
      
    } catch (error) {
      console.error('Error al verificar la sesión:', error);
    }
  };

  useEffect(() => {
   checkSession()
  }, [])
  

const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const updateUnidadVecinal = async () => {
    try {
        console.log("Datos a enviar en la solicitud PUT:", {
            unidadVecinal: modalUnidadVecinal,
            personas: modalPersonas,
            tipoDeConstruccion: modalTipoConstruccion,
            rubroConstruccion: modalRubroConstruccion,
        });
        const responseUpdatePerfilObra = await axios.put(`https://2lfj6g4k-3000.brs.devtunnels.ms/obras/${obraId}`, {
            unidadVecinal:parseInt(modalUnidadVecinal),
            personas: parseInt(modalPersonas),
            tipoDeConstruccion: modalTipoConstruccion,
            rubroConstruccion: modalRubroConstruccion,
        });
        console.log(responseUpdatePerfilObra.data);

        // Actualizar el estado local con los nuevos valores
        setUnidadVecinal(modalUnidadVecinal);
        setPersonas(modalPersonas);
        setTipoDeConstruccion(modalTipoConstruccion);
        setRubroConstruccion(modalRubroConstruccion);
    } catch (error) {
        console.error('Error en la solicitud PUT:', error);
    }
};

const updateAndCloseModal = async () => {
    await updateUnidadVecinal();
    await buscarPerfilPorEmpresa();  // Actualizar el estado local de obras
    toggleModal();
};
    

  const obtenerObras = async () => {
    try {
        const timestamp = new Date().getTime();
      const response = await axios.get(`https://2lfj6g4k-3000.brs.devtunnels.ms/obras?timestamp=${timestamp}`);
  
      if (response.data.obra && response.data.obra.length > 0) {
        // Filtrar obras por el nombre de empresa del usuario
        const obrasUsuario = response.data.obra.filter((obra) => obra.nombreEmpresa === nombreEmpresa);
  
        if (obrasUsuario.length > 0) {
          console.log(`Obras encontradas para ${nombreEmpresa}:`, obrasUsuario);
  
          // Iterar sobre las obras del usuario y mostrar la información
          obrasUsuario.forEach((obra) => {
            console.log(`Nombre de la empresa: ${obra.nombreEmpresa}`);
            console.log(`Dirección de la obra: ${obra.direccion}`);
            console.log(`Propiedad hormigonV de la obra: ${obra.hormigonV}`);
          });
  
          // Sumar la propiedad hormigonV de las obras del usuario
          const sumaHormigonVUsuario = obrasUsuario.reduce((total, obra) => total + obra.hormigonV, 0);
  
          console.log(`Suma de la propiedad hormigonV para ${nombreEmpresa}:`, sumaHormigonVUsuario);
  
          const direccionesObras = obrasUsuario.map((obra) => obra.direccion)
          const personasObras = obrasUsuario.reduce((total, obra)=>total + obra.personas, 0)
          console.log(`suma de personas en reduce para${personas}`, personasObras)
          const unidadVecinalObras = obrasUsuario.map((obra)=>obra.unidadVecinal)
          const tipoDeConstruccion = obrasUsuario.map((obra)=>obra.tipoDeConstruccion)
          const rubroConstruccion = obrasUsuario.map((obra)=> obra.rubroConstruccion)
          const obrasLenght = obrasUsuario.length
          setUnidadesVecinales(obrasLenght)
          
  
          // Puedes almacenar la suma en un estado si es necesario
          // setSumaHormigonV(sumaHormigonVUsuario);
  
          setDireccion(direccionesObras);
          setHormigonV(sumaHormigonVUsuario);
          setObras(obrasUsuario)
          setPersonas(personasObras)
          setUnidadVecinal(unidadVecinalObras)
          setTipoDeConstruccion(tipoDeConstruccion)
          setRubroConstruccion(rubroConstruccion)
        
  
          // Devuelve la suma si es necesario
          return sumaHormigonVUsuario
        } else {
          console.log(`No se encontraron obras para ${nombreEmpresa}.`);
        }
      } else {
        console.log('No se obtuvieron obras del servidor.');
      }
    } catch (error) {
      console.log("Error al obtener obras", error);
    }
  
    // Devuelve algo en caso de que la función no haya devuelto nada antes
    return null;
  };
  
  useEffect(() => {
    const obtenerYCrearObras = async () => {
        await obtenerObras();

        // Verificar si ya existe un perfil de obra para la empresa
        const obraExistente = await buscarPerfilPorEmpresa(nombreEmpresa);

        if (obraExistente) {
            // Si ya existe un perfil, puedes hacer algo con esa información si es necesario
            console.log("Perfil de obra existente:", nombreEmpresa);
            setObraId(obraExistente._id);
            console.log(obraExistente._id)
        } else {
            // Si no existe, crear un nuevo perfil de obra
            await createPerfilObras();
        }
    };

    obtenerYCrearObras();
}, [nombreEmpresa]);

const buscarPerfilPorEmpresa = async (empresa) => {
    try {
        const response = await axios.get("https://2lfj6g4k-3000.brs.devtunnels.ms/subirfoto", {
            params: {
                nombreEmpresa: empresa
            }
        });

        const perfiles = response.data.perfilobra;
        const perfilEncontrado = perfiles.find((perfil) => perfil.nombreEmpresa === nombreEmpresa);

        return perfilEncontrado || null;
    } catch (error) {
        console.log("Error al buscar perfil de obras:", error);
        return null;
    }
};

const takePhoto = async () => {
  const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

  if (permissionResult.status !== 'granted') {
    console.error('Permiso de cámara no otorgado');
    return;
  }

  const result = await ImagePicker.launchCameraAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });

  if (result.canceled === true) {
    // El usuario canceló la selección de la imagen
    return;
  }

  // Configuración de Cloudinary
  const { cloudName, apiKey, apiSecret } = cloudinaryConfig;

  const formData = new FormData();
  formData.append('file', {
    uri: result.assets[0].uri,
    type: 'image/jpeg',
    name: result.assets[0].uri.split('/').pop(),
  });

  try {
    const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload?upload_preset=rdvbxm5b`, {
      method: 'POST',
      body: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Basic ${encode(`${apiKey}:${apiSecret}`)}`,
      },
    });

    const responseData = await response.json();

    if (response.ok) {
        const imageUrl = responseData.secure_url;
        console.log('URL de la imagen en Cloudinary:', imageUrl);
        // Llamar a la función uploadImageToBackend con la URL de la imagen
        uploadImageToBackend(imageUrl);
      } else {
        // Manejar el error de Cloudinary
        console.error('Error al subir la imagen a Cloudinary:', responseData);
        // Puedes decidir si deseas seguir ejecutando uploadImageToBackend o manejar el error de otra manera.
        // uploadImageToBackend(null); // Llama a la función con null o maneja el error de alguna otra manera.
      }
    
  } catch (error) {
    console.error('Error al subir la imagen a Cloudinary:', error.message);
    // Puedes decidir si deseas seguir ejecutando uploadImageToBackend o manejar el error de otra manera.
    // uploadImageToBackend({ uri: null }); // Llama a la función con uri nula o maneja el error de alguna otra manera.
  }
};
const uploadImageToBackend = async (imageUrl) => {
    try {
        const response = await fetch('https://2lfj6g4k-3000.brs.devtunnels.ms/subirfoto', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json', // Cambiado a JSON
          },
          body: JSON.stringify({ imageUrl,
        unidadVecinal: unidadesVecinales,
        rampas,
        personas,
        hormigonV,
        nombreEmpresa,
        direccion,
        tipoDeConstruccion,
        rubroConstruccion
 }), // Enviar la URL como parte del cuerpo JSON
        });
    
        if (response.ok) {
          // Si la respuesta es exitosa, maneja la respuesta como JSON
          const responseData = await response.json();
          setImageUrl(responseData.response.img)
          console.log('URL de la imagen en el backend:', responseData.response.img);
        } else {
          // Si la respuesta no es exitosa, maneja el error
          console.error('Error al enviar la URL al backend:', response.statusText);
        }
      } catch (error) {
        console.error('Error al enviar la URL al backend:', error);
      }
    
};


  return (

    <View style={styles.container}>
        <View style={styles.fondo}>
            <Image source={fondo}/>
            <View style={styles.uVecinal}>
                <TouchableOpacity>
                    <Text style={styles.numeroUVecinal}>
                        {unidadesVecinales}
                    </Text>
                </TouchableOpacity>
                <Text style={styles.textoUVecinal}>
                    U. Vecinales 
                </Text> 
            </View>
            <View style={styles.personas}>
                <Text style={styles.numeroPersonas}>
                    {personas}
                </Text>
                <Text style={styles.textoPersonas}>
                    Personas Totales
                </Text>
            </View>
            <TouchableOpacity style={styles.circulo} onPress={takePhoto}>
      {!imageUrl ? <Image source={fotoPerfil} style={styles.circuloFoto} /> :
        <Image source={{uri: imageUrl}} style={styles.circuloFoto} />}

      <View style={styles.lapiz}></View>
    </TouchableOpacity>
            <Image source={camara} style={styles.camaraCirculo}/>
            <View style={styles.cantidadRampas}>
                <Text style={styles.numeroRampas}>
                    {rampas}
                </Text>
                <Text style={styles.textoRampas}>
                    Rampas
                </Text>
            </View>
            <Button title='Edita tu perfil' onPress={() => {
    setSelectedPerfilObra({
      _id: obraId, 
      unidadVecinal,
      rampas,
      personas,
      hormigonV,
      nombreEmpresa,
      direccion,
      tipoDeConstruccion,
      rubroConstruccion,
    });
    toggleModal()
  }}/>
            <Modal
        animationType="slide"
        transparent={false}
        visible={isModalVisible}
        onRequestClose={toggleModal}
      >
        <TextInput value={modalPersonas.toString()} onChangeText={(text) => setModalPersonas(parseInt(text))} placeholder='Personas en la obra'/>
        <TextInput placeholder='Unidad Vecinal' value={modalUnidadVecinal.toString()} onChangeText={(text=>setModalUnidadVecinal(parseInt(text)))}/>
        <TextInput placeholder='Tipo de Construcción: Ej.Edificio' value={modalTipoConstruccion.toString()} onChangeText={(text=>setModalTipoConstruccion(text))}/>
        <TextInput placeholder='Rubro de Construcción: Ej.Habitacional' value={modalRubroConstruccion.toString()} onChangeText={(text=>setModalRubroConstruccion(text))}/>
        <Button title='Edición terminada' onPress={updateAndCloseModal} />
      </Modal>
            </View>
            <View style={styles.metrosCubicos}>
                <Text style={styles.numeroMetrosCubicos}>
                    {hormigonV}
                </Text>
                <Text style={styles.textoMetrosCubicos}>
                    M. Cúbicos
                </Text>
            </View>
            <View style={styles.containerTitulo}>
                <Text style={styles.titulo}>
                    {nombreEmpresa}
                </Text>
            </View>
            {console.log("antes de la flatlist")}
            <FlatList
            data={obras}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item})=>(
                <View style={styles.containerDetalles}>
                <Text style={styles.textoDetalles}>
                    Dirección: {item.direccion}
                </Text>
                <Text style={styles.textoDetalles} >Unidad Vecinal: {item.unidadVecinal}</Text>
                
                <Text style={styles.textoDetalles}>Tipo de Construcción: {item.tipoDeConstruccion}</Text>
                <Text style={styles.textoDetalles}>Rubro de Construcción: {item.rubroConstruccion}</Text>
                <Text style={styles.textoDetalles}>Personas en la obra: {item.personas}</Text>
            </View>
  )}/>
            
           
        </View>
 
  )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        width: "100%",
        height: "100%",
        alignItems: "center"
    },
    fondo:{
        width: "100%",
        height: "50%",   
    },
    uVecinal: {
        position: "absolute",
        bottom: 260,
        alignItems: "center",
        left: 30
    },
    numeroUVecinal: {
        "color": "white",
        fontSize: 30,
        fontWeight: "bold"
    },
    textoUVecinal:{
        "color": "white",
        fontWeight: "semibold",
        fontSize: 15
    },
    personas: {
        position: "absolute",
        bottom: 150,
        alignItems: "center",
        left: 30,
        alignContent: "center"
    },
    numeroPersonas: {
        "color": "white",
        fontSize: 30,
        fontWeight: "bold"
    },
    textoPersonas:{
        "color": "white",
        fontWeight: "semibold",
        fontSize: 15
    },
    cantidadRampas: {
        position: "absolute",
        bottom: 259,
        alignItems: "center",
        left: 260,
        alignContent: "center"
    },
    numeroRampas: {
        "color": "white",
        fontSize: 30,
        fontWeight: "bold"
    },
    textoRampas:{
        "color": "white",
        fontWeight: "semibold",
        fontSize: 15,
        
    },
    metrosCubicos: {
        position: "absolute",
        bottom: 510,
        alignItems: "center",
        left: 245,
        alignContent: "center"
    },
    numeroMetrosCubicos: {
        "color": "white",
        fontSize: 30,
        fontWeight: "bold"
    },
    textoMetrosCubicos:{
        "color": "white",
        fontWeight: "semibold",
        fontSize: 15,
        
    },
    titulo:{
        fontSize: 30,
        fontWeight: "900",
        position: "absolute",
        bottom: 30,
        right: -120,   
    },
    containerTitulo:{
        display: "flex",
        justifyContent: "center",
        position: "absolute",
        bottom: 320,
        right: 390

    },
    textoDetalles:{
        color: "gray",
        fontSize: 18,
        fontWeight: "bold",
        position: "relative",
        top: 15,
        right: 18
    },
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
        right: 50,
        borderRadius: 50,
        borderColor: "white",
        borderWidth: 3,
        bottom: 80
    },
    camaraCirculo:{
        position: "absolute",
        right: 188,
        top: 68
    },
    editarPerfil:{
        color: "white",
        position: "absolute",
        bottom: 220,
        left: 135
    },
    modal:{
        backgroundColor: "white",
    },
    scroll:{
        flex: 1
    },
    containerDetalles:{
        width: "100%",
        flex: 1, 
        left: 25,
        height: 230
    }
})
 
export default SlideConstructora