import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image , StyleSheet} from 'react-native';

const DropdownForm = ({ title, imageSource, onVolumenChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [largo, setLargo] = useState('');
  const [ancho, setAncho] = useState('');
  const [alto, setAlto] = useState('');
  const [volumen, setVolumen] = useState(null);

  useEffect(() => {
    if (largo && ancho && alto) {
      const result = parseFloat(largo) * parseFloat(ancho) * parseFloat(alto);
      setVolumen(result.toFixed(2));

      // Llama a la función proporcionada por el componente padre para actualizar el valor en el componente padre
      if (onVolumenChange) {
        onVolumenChange(result.toFixed(2));
      }
    }
  }, [largo, ancho, alto, onVolumenChange]);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={() => setIsOpen(!isOpen)}>
        {imageSource && <Image source={imageSource} style={styles.icon} />}
        <Text style={styles.buttonText}>{title} ▼</Text>
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
          <TextInput 
            style={styles.input}
            placeholder="Alto"
            onChangeText={setAlto}
            keyboardType="numeric"
          />
          {volumen && <Text style={styles.volumenText}>Volumen: {volumen} M3</Text>}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderColor: '#44B03E',
        borderRadius: 10,
        width: "100%",
        padding: 10,
        flex: 1,
        justifyContent: "center",
        marginBottom: 10
    },
    icon: {
      width: 25,  // o cualquier tamaño que desees
      height: 25, // o cualquier tamaño que desees
      marginRight: 10, // espacio a la derecha de la imagen
    },
    button: {
      backgroundColor: '#44B03E',
      padding: 10,
      borderRadius: 5,
      flexDirection: 'row',   // para que el icono y el texto estén en línea
      justifyContent: 'center',  // alinea el contenido hacia la izquierda
      alignItems: 'center',
      paddingLeft: 25,  // agrega este padding para dar un espacio a la izquierda
  },
  
    buttonText: {
        color: 'white',
    },
    input: {
        height: 36,
        borderWidth: 1,
        borderColor: '#44B03E',
        borderRadius: 10,
        width: '100%',
        marginBottom: 5,
        color: '#44B03E',
        paddingLeft: 10,
    },
    volumenText: {
        marginTop: 10,
        fontWeight: 'bold',
        color: '#44B03E',
    }
});

export default DropdownForm;
