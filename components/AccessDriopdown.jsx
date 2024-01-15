import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';



const AccessDropdown = ({ imageSource, onAreaChange  }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [largo, setLargo] = useState('');
  const [ancho, setAncho] = useState('');
  const [area, setArea] = useState(null);

  useEffect(() => {
    if (largo && ancho) {
      const result = parseFloat(largo) * parseFloat(ancho);
      const areaValue = result.toFixed(2);
      setArea(areaValue);
      
      // Llama a la función proporcionada por el componente padre para actualizar el valor en el componente padre
      if (onAreaChange) {
        onAreaChange(areaValue);
      }
    }
  }, [largo, ancho, onAreaChange]);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={() => setIsOpen(!isOpen)}>
        {imageSource && <Image source={imageSource} style={styles.icon} />}
        <Text style={styles.buttonText}>Acceso Universal ▼</Text>
      </TouchableOpacity>
      {isOpen && (
        <View>
          <TextInput 
            style={styles.input}
            placeholder="Largo"
            onChangeText={setLargo}
            keyboardType="numeric"
          />
          <TextInput 
            style={styles.input}
            placeholder="Ancho"
            onChangeText={setAncho}
            keyboardType="numeric"
          />
          {area && <Text style={styles.areaText}>Área de la Rampa: {area} M2</Text>}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderColor: '#39A3E8',
        borderRadius: 10,
        width: 229,
        padding: 10,
    },
    icon: {
      width: 25,
      height: 25,
      marginRight: 15,
    },
    button: {
      backgroundColor: '#39A3E8',
      height: 36,
      borderRadius: 5,
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      paddingLeft: 25,
    },
    buttonText: {
        color: 'white',
    },
    input: {
        height: 36,
        borderWidth: 1,
        borderColor: '#39A3E8',
        borderRadius: 10,
        width: '100%',
        marginBottom: 5,
        color: '#39A3E8',
        paddingLeft: 10,
    },
    areaText: {
        marginTop: 10,
        fontWeight: 'bold',
        color: '#39A3E8',
    }
});

export default AccessDropdown;
