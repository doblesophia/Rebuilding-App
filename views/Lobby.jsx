import React, {useEffect, useState} from 'react';
import { View, StyleSheet, Image,ImageBackground, Text, Button, TouchableWithoutFeedback  } from 'react-native';
import { TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

//import Header from './Header';


const Lobby = (props) => {
    const [role, setRole] = useState(null)

    useEffect(() => {
        checkSession();
      }, []);
    
      const checkSession = async () => {
        try {
          
          const userToken = await AsyncStorage.getItem('userToken');
          const role = await AsyncStorage.getItem('userRole')
          console.log(role)
    
          
          if (!userToken) {
            props.navigation.navigate('Inicia sesión'); 
          }

          setRole(role)
          
        } catch (error) {
          console.error('Error al verificar la sesión:', error);
        }
      };

      const handleRCDBtnPress = () => {
        // Verificar la sesión antes de navegar a la pantalla "RCD"
        checkSession();
        // Si la sesión está verificada, navegar a la pantalla "RCD"
        props.navigation.navigate('Matches Ubicación'); // Cambia 'RCD' con el nombre de la pantalla correspondiente
      };

      const handleRampas = () => {
        props.navigation.navigate("Mapa Rampa")
      }
    return (
        <ImageBackground 
            source={require('../assets/construccion.jpg')} 
            style={styles.container}
        >
        
            {/* <Image 
                    source={require('../assets/logo.png')} 
                    style={styles.profileImage} 
                    /> 
        */}
         <View style={styles.overlay} />


            <Image 
                source={require('../assets/Ellipse.png')} 
                style={styles.elipse}
            />
            
            
            <TouchableOpacity style={styles.circleTopLeftContainer} onPress={handleRampas}>
                <Image source={require('../assets/circuloAzul.png')} style={styles.circleTopLeft} />
                <Image source={require('../assets/consumer.png')} style={styles.circleTopLeftImage} />
                <Text style={styles.circleTopLeftText}>Demanda Rampas</Text>
            </TouchableOpacity>


            <TouchableOpacity style={styles.circleTopCenterContainer} onPress={handleRCDBtnPress}>
                <Image source={require('../assets/circuloVerde.png')} style={styles.circleTopCenter} />
                <Image source={require('../assets/rcdmarket.png')} style={styles.rcdMarketImage} />
                <Text style={styles.circleTopCenterText}>RCD Market</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.circleTopRightContainer} onPress={()=>props.navigation.navigate("Perfil Vecino")}>
                <Image source={require('../assets/emprendedor.png')} style={styles.circleTopRightImage} />
                <Text style={styles.circleTopRightText}>Vecino</Text>
                <Image source={require('../assets/circuloAzul.png')} style={styles.circleTopRight} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.circleBottomLeftContainer} onPress={() => props.navigation.navigate('Mapa')}>
                <Image source={require('../assets/territorial.png')} style={styles.circleBottomLeftImage} />
                <Text style={styles.circleBottomLeftText}>Oferta{"\n"}Residuos</Text>
                <Image source={require('../assets/circuloVerde.png')} style={styles.circleBottomLeft} />
            </TouchableOpacity>

            {role==='2' ? 
                (<TouchableOpacity style={styles.circleBottomCenterContainer} onPress={()=>props.navigation.navigate("Matches Ubicación")}>
                <Image source={require('../assets/circuloAzul.png')} style={styles.circleBottomCenter} />
                <Image source={require('../assets/brothers.png')} style={styles.bottomCenterImage} />
                <Text style={styles.circleBottomCenterText}>Matches</Text>
            </TouchableOpacity>) :
             (<TouchableOpacity style={styles.circleBottomCenterContainer} onPress={()=>props.navigation.navigate("Perfil Constructora")}>
             <Image source={require('../assets/circuloAzul.png')} style={styles.circleBottomCenter} />
             <Image source={require('../assets/emprendedor.png')} style={styles.bottomCenterImage} />
             <Text style={styles.circleBottomCenterText}>Perfil{"\n"}Constructora</Text>
         </TouchableOpacity>)}


            <TouchableOpacity style={styles.circleBottomRightContainer} onPress={()=>props.navigation.navigate("Ubicaciones")}>
                <Image source={require('../assets/circuloVerde.png')} style={styles.circleBottomRight} />
                <Image source={require('../assets/rampas.png')} style={styles.bottomRightImage} />
                <Text style={styles.circleBottomRightText}>Obras{"\n"}Constructoras</Text>
            </TouchableOpacity>

            <TouchableWithoutFeedback onPress={() => {
    console.log('Botón presionado');
    props.navigation.navigate('Mapa');
}}>
                <View style={styles.roundedRectangle}>
                    <Image source={require('../assets/reciclaje.png')} style={styles.rectangleImage} />
                    <Text style={styles.rectangleText}>RECICLAJE TERRITORIAL SOCIAL</Text>
                </View>
            </TouchableWithoutFeedback>
        </ImageBackground>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        opacity: 1,
        backgroundColor: "black"
    },
    customHeader: {
        position: 'absolute',
        top: 0,
        alignSelf: 'stretch',
        zIndex: 10,  // Esto asegura que el Header esté encima de los otros componentes
    },
    backgroundContainer: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        zIndex: 0,
        resizeMode: 'cover',
    },
    elipse: {
        width: 255,
        height: 255,
        position: 'absolute',
        top: 190,
        left: '50%',
        marginLeft: -127.5,  // Mitad del ancho de la elipse
    },
    circleTopLeft: {
        position: 'absolute',
        width: 78,
        height: 78,
        top: 170,
        left: 50,
    },
    circleTopCenter: {
        position: 'absolute',
        width: 78,
        height: 78,
        top: 100,
        left: '50%',
        marginLeft: -39,  // Mitad del ancho del círculo
    },
    
    circleTopRight: {
        position: 'absolute',
        width: 78,
        height: 78,
        top: 150,
        left: 270,
    },
    circleBottomLeft: {
        position: 'absolute',
        width: 78,
        height: 78,
        top: 300,
        left: 50,
    },
    circleBottomCenter: {
        position: 'absolute',
        width: 78,
        height: 78,
        top: 350,
        left: '50%',
        marginLeft: -39,  // Mitad del ancho del círculo
    },
    circleBottomRight: {
        position: 'absolute',
        width: 78,
        height: 78,
        top: 300,
        left: 270,
    },
    profileImage: {
         width: 80,
         height: 70,
        //borderRadius: 55.5,
        position: 'absolute',
        alignSelf: 'center',
        top: 265,
        marginTop: -55.5,  // Centra verticalmente
        zIndex: 1,  // Para asegurar que aparezca por encima de otros elementos
        //backgroundColor: 'lightgray',  // Fallback color
        // borderWidth: 5,  // Grosor del borde
        // borderColor: '#FFFFFF',  // Color del borde
    },
    roundedRectangle: {
        width: 299,
        height: 74,
        borderRadius: 50,
        backgroundColor: '#E3E3E3',
        borderWidth: 2,
        borderColor: '#FFF',
        flexDirection: 'row', // Para contener y alinear los elementos hijos horizontalmente.
        alignItems: 'center', // Centrar la imagen verticalmente dentro del rectángulo.
        top: 250,  // Ajusta para cambiar la posición vertical// Esto centra el rectángulo horizontalmente.
        justifyContent: 'flex-start',
        paddingHorizontal: 10,  // Un poco de padding horizontal para que los elementos no estén pegados al borde.
    },
    reciclajeImage: {
        width: 38,  // Ajusta este valor según el tamaño de la imagen.
        height: 40, // Ajusta este valor según el tamaño de la imagen.
        marginLeft: 20, // Distancia desde el lado izquierdo del rectángulo.
        //left: 20,  // Ajusta para cambiar la posición horizontal de la imagen.
    },
    rectangleText: {
        width: 155,
        height: 40,
        color: '#2C2D2D',
        fontSize: 13,
        fontWeight: '600',
     // Centra el texto horizontalmente
        marginLeft: 10, 
        position: "absolute",
        left: 70// Añade espacio entre la imagen y el texto.
    },
    arrowCircle: {
        width: 38,
        height: 38,
        backgroundColor: 'white',
        borderRadius: 19,  // La mitad del width y height para hacerlo completamente redondo.
        alignItems: 'center',  // Centrar horizontalmente
        justifyContent: 'center',  // Centrar verticalmente
        marginRight: 20,
    },
    arrowText: {
        fontSize: 18,  // Puedes ajustar esto si necesitas que ">" sea más grande o más pequeño.
        color: 'black',  // Color del símbolo ">"
    },
    circleTopCenterContainer: {
        position: 'absolute',
        width: 78,
        height: 78,
        top: 155,
        left: '50%',
        marginLeft: -39,  // Mitad del ancho del círculo
        alignItems: 'center',  // Centra los elementos hijos horizontalmente
        justifyContent: 'space-between',  // Distribuye los hijos (imagen y texto) verticalmente
        paddingVertical: 15,  // Añade un pequeño padding para separar imagen y texto de los bordes
    },
    
    circleTopCenter: {
        position: 'absolute',
        width: 78,
        height: 78,
        zIndex: 1,
    },
    
    rcdMarketImage: {
        width: 25,
        height: 23,
        zIndex: 2,
    },
    
    
    circleTopCenterText: {
        color: '#31410D',
        fontSize: 8,
        fontWeight: '700',
        lineHeight: 29.256,  // Se obtuvo a partir del 365.7% que proporcionaste
        textAlign: 'center',
        zIndex: 3,
    },
    circleTopLeftContainer: {
        position: 'absolute',
        width: 78,
        height: 78,
        top: 200,
        left: 35,
        alignItems: 'center',  // Centra los elementos hijos horizontalmente
        justifyContent: 'center',  // Centra los elementos hijos verticalmente
    },
    
    circleTopLeft: {
        position: 'absolute',
        width: 78,
        height: 78,
        zIndex: 1,
    },
    
    circleTopLeftImage: {
        width: 25,  // Puedes ajustar según necesites
        height: 23,  // Puedes ajustar según necesites
        zIndex: 2,
    },
    
    circleTopLeftText: {
        color: '#31410D',
        fontSize: 8,
        fontWeight: '700',
        lineHeight: 29.256,  // Se obtuvo a partir del 365.7% que proporcionaste
        textAlign: 'center',
        zIndex: 3,
    },
    circleTopRightContainer: {
        position: 'absolute',
        width: 78,
        height: 78,
        top: 200,
        left: 245,
        alignItems: 'center',  // Centra los elementos hijos horizontalmente
        justifyContent: 'center',  // Centra los elementos hijos verticalmente
    },
    
    circleTopRight: {
        position: 'absolute',
        width: 78,
        height: 78,
        zIndex: 1,
    },
    
    circleTopRightImage: {
        width: 25,  // Puedes ajustar según necesites
        height: 23,  // Puedes ajustar según necesites
        zIndex: 2,
    },
    
    circleTopRightText: {
        color: '#31410D',
        fontSize: 8,
        fontWeight: '700',
        lineHeight: 29.256,  // Se obtuvo a partir del 365.7% que proporcionaste
        textAlign: 'center',
        zIndex: 3,
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
    
    circleBottomLeft: {
        position: 'absolute',
        width: 78,
        height: 78,
        zIndex: 1,
    },
    
    circleBottomLeftImage: {
        width: 25,  // Puedes ajustar según necesites
        height: 23,  // Puedes ajustar según necesites
        zIndex: 2,
    },
    
    circleBottomLeftContainer: {
        position: 'absolute',
        width: 78,
        height: 78,
        top: 320,
        left: 35,
        alignItems: 'center',  // Centra los elementos hijos horizontalmente
        justifyContent: 'center',  // Centra los elementos hijos verticalmente
    },

    circleBottomLeft: {
        position: 'absolute',
        width: 78,
        height: 78,
        zIndex: 1,
    },

    circleBottomLeftImage: {
        width: 25,  // Puedes ajustar según necesites
        height: 23,  // Puedes ajustar según necesites
        zIndex: 2,
    },

    circleBottomLeftText: {
        color: '#31410D',
        fontSize: 8,
        fontWeight: '700',
        lineHeight: 10,  // Se obtuvo a partir del 365.7% que proporcionaste
        textAlign: 'center',
        zIndex: 3,
        marginTop:5,
        
    },
    circleBottomCenterContainer: {
        position: 'absolute',
        width: 78,
        height: 78,
        top: 395,
        left: '50%',
        marginLeft: -39,
        alignItems: 'center', // Centrar los elementos hijos horizontalmente
        justifyContent: 'flex-start', // Alinear desde el principio del contenedor verticalmente
        paddingVertical: 20,
    },
    
    circleBottomCenter: {
        position: 'absolute',
        width: 78,
        height: 78,
        zIndex: 1,
    },
    
    bottomCenterImage: {
        width: 25,
        height: 23,
        zIndex: 2,
    },
    
    circleBottomCenterText: {
        //marginTop: 5,  // Añade un margen superior para separar el texto de la imagen
        color: '#31410D',
        fontSize: 8,
        fontWeight: '700',
        //lineHeight: 20,
        textAlign: 'center',
        zIndex: 3,
    },
    circleBottomRightContainer: {
        position: 'absolute',
        width: 78,
        height: 78,
        top: 320,
        left: 250,
        alignItems: 'center', // Centrar los elementos hijos horizontalmente
        justifyContent: 'flex-start', // Alinear desde el principio del contenedor verticalmente
        paddingVertical: 15,
    },
    
    circleBottomRight: {
        position: 'absolute',
        width: 78,
        height: 78,
        zIndex: 1,
    },
    
    bottomRightImage: {
        width: 25,
        height: 23,
        zIndex: 2,
    },
    
    circleBottomRightText: {
        //marginTop: 5,  // Añade un margen superior para separar el texto de la imagen
        color: '#31410D',
        fontSize: 8,
        fontWeight: '700',
        //lineHeight: 20,
        textAlign: 'center',
        zIndex: 3,
    },
    rectangleImage:{
        position: "absolute",
        left: 30
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: '#181818',
        opacity: 0.7,
      },      
});

export default Lobby;



