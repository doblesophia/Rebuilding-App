import React from 'react'
import { Image, StyleSheet, View } from 'react-native'
import logo from "../assets/logo.png"

const Header = () => {
  return (
    <View style={styles.barra}>
      <Image style={styles.logo} source={logo}/>
    </View>
  )
}

const styles = StyleSheet.create({
    barra:{
        height: "13%",
        width: "100%",
        backgroundColor: "#514744",
        position: "absolute",
        top: 0
        
    },
    logo:{
        width:90,
        height: 80,
        position: "absolute",
        left: "37%",
        top: 5
    }
})

export default Header
