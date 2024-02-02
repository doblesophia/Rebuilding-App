import axios, { Axios } from 'axios';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity, Alert } from 'react-native';
import fotoMatch from '../assets/MatchC.png';

const Matches = () => {
  const [matches, setMatches] = useState([]);
  const [obras, setObras] = useState([]);
  const [rampas, setRampas] = useState([]);
  const [rampasData, setRampasData] = useState({});
  const [obrasData, setObrasData] = useState({});

  const traerInformacion = async () => {
    try {
      const [matchesResponse, obrasResponse, rampasResponse] = await Promise.all([
        axios.get('https://2lfj6g4k-3000.brs.devtunnels.ms/matches'),
        axios.get('https://2lfj6g4k-3000.brs.devtunnels.ms/obras?v=1'),
        axios.get('https://2lfj6g4k-3000.brs.devtunnels.ms/rampas?v=1'),
      ]);

      console.log('Matches Data:', matchesResponse.data);
      console.log('Obras Data:', obrasResponse.data);
      console.log('Rampas Data:', rampasResponse.data);

      const matchesData = matchesResponse.data;
      setMatches(matchesData);
      

      const obrasData = obrasResponse.data.obra;
      setObras(obrasData);
      
  
      const obrasMap = obrasData.reduce((acc, obra) => {
        acc[obra._id] = obra;
        return acc;
      }, {});
      setObrasData(obrasMap);

      const rampasData = rampasResponse.data.rampa;
      
      setRampas(rampasData);
      const rampasMap = rampasData.reduce((acc, rampa) => {
        acc[rampa._id] = rampa;
        return acc;
      }, {});
      setRampasData(rampasMap);

      return {
        matches: matchesData,
        obras: obrasData,
        rampas: rampasData,
      };
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  console.log("matches.matches", matches.matches)

  useEffect(() => {
    traerInformacion();
  }, []);
  
const deleteInformacion = async (matchId) => {
  try {
    Alert.alert(
      'Confirmar Eliminación',
      '¿Estás seguro de que quieres eliminar este match?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Aceptar',
          onPress: async () => {
            await axios.delete(`https://2lfj6g4k-3000.brs.devtunnels.ms/matches/${matchId}`);
            traerInformacion();
          },
        },
      ],
      { cancelable: true }
    );
  } catch (error) {
    console.log(error)
  }
}

  return (
    <View style={styles.container}>
      <FlatList
      data={matches.matches}
      keyExtractor={(item) => item._id}
      renderItem={({ item }) => {
        console.log('Renderizando Item:', item);

        // Verifica si item, rampasData y obrasData son válidos antes de continuar
        if (!item || !rampasData || !obrasData) {
          console.log('Datos inválidos en renderItem');
          return null; // Puedes devolver null o algún indicador de carga
        }

        // Mueve la definición de rampaId y obraId aquí, después de las verificaciones iniciales
        const rampaId = item.rampa;
        console.log(rampaId);
        const obraId = item.obra;
        console.log(obraId);

        // Verifica si rampaId y obraId son válidos antes de continuar
        if (!rampaId || !obraId) {
          console.log('ID de rampa u obra inválidos en renderItem');
          return null;
        }

        // Ahora que los IDs son válidos, puedes continuar con las siguientes verificaciones
        if (!rampasData[rampaId] || !obrasData[obraId]) {
          // Si falta información, puedes retornar algo indicando que falta información
          return <Text>Falta información para renderizar este elemento.</Text>;
        }

        const rampa = rampasData[rampaId];
        const obra = obrasData[obraId];

        // Verifica si rampa y obra son válidos antes de continuar
        if (!rampa || !obra) {
          console.log('Rampa u obra no encontrada en renderItem');
          return null;
        }

        return (
          <View style={styles.containerMatch}>
            <Text style={styles.nombreConstructora}>Nombre Constructora: {obra.nombreEmpresa}</Text>
            <Text style={styles.direccionObra}>Dirección de la obra: {obra.direccion}</Text>
            <Image source={{uri: rampa.imageUrl}} style={styles.foto}/>
            {console.log("rampa", rampa)}
            <Text style={styles.textRampa}>Dirección Rampa: {rampa.direccionRampa}</Text>
            <Text>Teléfono: {rampa.telefono}</Text>
            <TouchableOpacity style={styles.buttonMatch} onPress={() => deleteInformacion(item._id)}>
              <Text style={styles.textButton}>Eliminar match</Text>
            </TouchableOpacity>
          </View>
        );
      }}
    />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  containerMatch: {
    width: '100%',
    height: '50%',
    flex: 1,
    alignItems: 'center',
  },
  fotoMatch: {
    width: '100%',
  },
  nombreConstructora: {
    fontSize: 17,
    fontWeight: '700',
    padding: 10,
    backgroundColor: "gray",
    borderRadius: 10,
    marginTop: 20
  },
  nombreComuna: {
    fontSize: 15,
    fontWeight: '500',
  },
  buttonMatch:{
    backgroundColor: "#ff6666",
    width: 120,
    height: 30,
    borderRadius: 10,
    marginBottom: 10,
    marginTop: 5,
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  textButton:{
    fontWeight: "bold"
  },
  direccionObra:{
    backgroundColor: "#90EE90",
    marginVertical: 10,
    borderRadius: 10,
    fontWeight: "bold"
  },
  textRampa:{
    backgroundColor: "#BBDEFB",
    marginVertical: 10,
    fontWeight: "bold",
    borderRadius: 10
  },
  foto:{
    width: "100%",
    height: 150
  }
});

export default Matches;