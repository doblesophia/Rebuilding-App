const uploadImageToGoogleStorage = async (uri) => {
    try {
      const formData = new FormData();
      formData.append('imagen', {
        uri,
        type: 'image/jpeg', // Ajusta según el tipo de archivo que estés subiendo
        name: 'imagen.jpg',
      });
  
      const response = await fetch('https://2lfj6g4k-3000.brs.devtunnels.ms/subir-imagen', {
        method: 'POST',
        body: formData,
      });
  
      const result = await response.json();
      return result.publicUrl;
    } catch (error) {
      console.error('Error al cargar la imagen en Google Cloud Storage:', error);
      throw error;
    }
  };

  export default uploadImageToGoogleStorage