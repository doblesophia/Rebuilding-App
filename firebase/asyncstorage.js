import storage from '@react-native-firebase/storage';

const uploadImageToFirebase = async (imageUri, imageName) => {
    try {
      // Obtén la referencia al almacenamiento en Firebase
      const storageRef = storage().ref();
  
      // Cambia el path según tu necesidad, por ejemplo, 'images/' + imageName
      const imageRef = storageRef.child('images/' + imageName);
  
      // Convierte la imagen a blob
      const response = await fetch(imageUri);
      const blob = await response.blob();
  
      // Sube el blob al almacenamiento en Firebase
      await imageRef.put(blob);
  
      // Obtén la URL de descarga de la imagen
      const downloadURL = await imageRef.getDownloadURL();
  
      // Ahora 'downloadURL' contiene la URL de la imagen almacenada en Firebase
      console.log('Imagen almacenada en Firebase:', downloadURL);
  
      return downloadURL;
    } catch (error) {
      console.error('Error al subir la imagen a Firebase:', error);
      throw error;
    }
  };
  
  export default uploadImageToFirebase