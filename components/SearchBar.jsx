import React from 'react'

const SearchBar = () => {
  return (
     
    <View style={styles.searchBox}>
    <TextInput
      style={styles.searchBoxField}
      placeholder='Busca tu dirección aquí'
      onChangeText={setSearchText}
      autoCapitalize='sentences'
    />
    <TouchableOpacity
      style={styles.buttonContainer}
      onPress={searchPlaces}
    >
      <Text style={styles.buttonLabel}>
        Búsqueda
      </Text>
    </TouchableOpacity>
  </View>
  )
}

export default SearchBar
