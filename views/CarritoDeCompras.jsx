import { useRoute } from '@react-navigation/native'
import React from 'react'
import { StyleSheet, TouchableOpacity, View, Text, ScrollView, Linking } from 'react-native'

const CarritoDeCompras = () => {

  const route = useRoute()
  const {area, precio} = route.params

    const url = "https://www.webpay.cl/form-pay/156262"
  const handleOpenURL = async () => {
    
    try {
      const supported = await Linking.canOpenURL(url);

      if (supported) {
        await Linking.openURL(url);
      } else {
        console.error("No se puede abrir la URL:", url);
      }
    } catch (error) {
      console.error("Error al intentar abrir la URL:", error);
    }
  };
  return (
   
    <ScrollView style={styles.scroll}>
    <View style={styles.contain}>
      <View style={styles.contain2}>
        <View>
          <Text style={styles.products}>Rampa</Text>
        </View>
        <View style={styles.cardCarrito}>
          <View>
            <Text style={styles.qty}>Metros Cuadrados: {area}</Text>
          </View>

          <Text></Text>
          <Text>${precio}</Text>
        </View>
      </View>

      <View style={styles.price}>
        <Text style={styles.pricetext}>TOTAL: ${precio}</Text>
      </View>


      <View>
        <TouchableOpacity style={styles.clear}>
          <Text style={styles.cleartext}>Limpiar carrito</Text>
        </TouchableOpacity>
      </View>

      <View>
        <TouchableOpacity style={styles.purchase} onPress={handleOpenURL}>
          <Text style={styles.purchasetext}>Completa la compra</Text>
        </TouchableOpacity>
      </View>
  </View>
</ScrollView>
  )
}

const styles = StyleSheet.create({
    scroll:{
    backgroundColor:"#f0ebe3"
    }, 
    contain:{
    flex: 1,
    backgroundColor: '#f0ebe3',
    alignItems: 'center',
    justifyContent: 'center',
    },
    contain2:{
        flex:1,
    backgroundColor: '#f0ebe3',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    marginBottom: 30,
    
    },
    products:{
      fontWeight:"bold",
      fontSize: 20,
      marginBottom: 12,
    },
    cardCarrito:{
      backgroundColor: "#9ca3af",
      width: 320,
      height: 100,
      borderRadius: 10,
      display: "flex",
      flexDirection: "row", 
      alignItems: "center",
      justifyContent: "space-evenly"
    },
    photo:{
      width: 60,
      height:60,
      marginLeft: 5,
      objectFit: "contain"
    },
    img:{
      width: 60,
      height:60,
    },
    borderButton:{
      borderWidth: 2,
      width: 30,
      height: 30,
      borderRadius: 5,
      justifyContent: "center",
      alignItems: "center",
      display: "flex"
    },
    menos:{
      
    },
    divmenos:{
      width:30,
      height: 20,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },  
    price:{
      marginTop: 10,
      marginLeft: 130,
      marginBottom: 10
    },
    pricetext:{
      fontWeight: "bold",
      fontSize:15
    },
    qty:{
      marginLeft: 5
    },
    addmore:{
      backgroundColor: "#7D9D9C",
      marginTop: 10,
      height:35,
      width: 260,
      borderRadius: 10,
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    },
    addmoretext:{
      color: "white",
      fontWeight: "bold"
    },
    clear:{
      backgroundColor: "#ef4444",
      marginTop: 10,
      height:35,
      width: 260,
      borderRadius: 10,
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    },
    cleartext:{
      color: "white",
      fontWeight: "bold"
    },
    purchase:{
      backgroundColor: "#7D9D9C",
      marginTop: 10,
      height:35,
      width: 260,
      borderRadius: 10,
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    },
    purchasetext:{
      color: "white",
      fontWeight: "bold"
    }
  })

export default CarritoDeCompras



