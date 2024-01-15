import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity, Button, TextInput} from 'react-native'
import Modal from "react-native-modal"
import fondo from "../assets/fondoNegro.png"
import fotoPerfil from "../assets/ImagenPerfil.png"
import circuloCamara from "../assets/Ellipse 7.png"
import camara from "../assets/Group.png"
import axios from 'axios'

const SlideConstructora = () => {
const [isModalVisible, setModalVisible] = useState(false);
const [unidadVecinal, setUnidadVecinal] = useState ("")
const [personas, setPersonas] = useState(0)
const [direccion, setDireccion] = useState("")
const [tipoDeConstruccion, setTipoDeConstruccion] = useState("")
const [rubroConstruccion, setRubroConstruccion] = useState("")
const [rampas, setRampas] = useState(0)
const [metrosCubicos, setMetrosCubicos] = useState(0)
const [nombreEmpresa, setNombreEmpresa] = useState("")

const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

    const createSlide = async () => {
        const responseCreatePerfilObra = await axios.post("https://2lfj6g4k-3000.brs.devtunnels.ms/perfilobra", {
            unidadVecinal, 
            rampas,
            personas,
            metrosCubicos,
            nombreEmpresa,
            direccion,
            tipoDeConstruccion,
            rubroConstruccion
        })
    }

    const updateUnidadVecinal = async () => {
        const responseUpdatePerfilObra = await axios.put("https://2lfj6g4k-3000.brs.devtunnels.ms/")
        console.log(responseUpdatePerfilObra)
    }

    const obtenerObras = async () => {
        try {
            const response = await axios.get("https://2lfj6g4k-3000.brs.devtunnels.ms/obras")
        console.log(response.data)
        if (response.data.obra.length > 0) {
            const nombreEmpresa = response.data.obra[0].nombreEmpresa;
            setNombreEmpresa(nombreEmpresa);
          }
        } catch (error) {
            console.log("Error al obtener obra", error)
        }
        

    }
    useEffect(() => {
        obtenerObras()
    }, [])
    

  return (
    <View style={styles.container}>
        <View style={styles.fondo}>
            <Image source={fondo}/>
            <Button title='Edita tu perfil' onPress={toggleModal}/>
            <Modal isVisible={isModalVisible}>
        <View style={styles.modal}>
          <TextInput placeholder='Unidad Vecinal' style={styles.input}/>
          <TextInput placeholder='Personas' style={styles.input}/>
          <TextInput placeholder='Dirección' style={styles.input}/>
          <TextInput placeholder='¿Qué estás construyendo?' style={styles.input}/>
          <TextInput placeholder='¿Qué función cumplirá? Ej. Habitacional' style={styles.input}/>
          <Button title="Edición terminada" onPress={toggleModal}/>
        </View>
      </Modal>
            <View style={styles.uVecinal}>
                <TouchableOpacity onPress={updateUnidadVecinal}>
                    <Text style={styles.numeroUVecinal}>
                        10
                    </Text>
                </TouchableOpacity>
                <Text style={styles.textoUVecinal}>
                    U. Vecinal
                </Text>
            </View>
            <View style={styles.personas}>
                <Text style={styles.numeroPersonas}>
                    322
                </Text>
                <Text style={styles.textoPersonas}>
                    Personas
                </Text>
            </View>
            <View style={styles.circulo}>
                <Image source={fotoPerfil} style={styles.circuloFoto}/>
                
                <View style={styles.lapiz}>

                </View>
            </View>
            <Image source={camara} style={styles.camaraCirculo}/>
            <View style={styles.cantidadRampas}>
                <Text style={styles.numeroRampas}>
                    22
                </Text>
                <Text style={styles.textoRampas}>
                    Rampas
                </Text>
            </View>
            </View>
            <View style={styles.metrosCubicos}>
                <Text style={styles.numeroMetrosCubicos}>
                    43
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
            <View style={styles.containerDetalles}>
                <Text style={styles.textoDetalles}>
                    Dirección
                </Text>
                <Text style={styles.textoDetalles}>
                    Edificio de 18 pisos
                </Text>
                <Text style={styles.textoDetalles}>
                    Habitacional y oficina
                </Text>
            </View>
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
        alignItems: "flex-start",
        position: "absolute",
        bottom: 320
    },
    containerDetalles:{
        position: "absolute",
        bottom: 260,
        left: 30
    },
    textoDetalles:{
        color: "gray",
        fontSize: 18,
        fontWeight: "bold"
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
})

export default SlideConstructora