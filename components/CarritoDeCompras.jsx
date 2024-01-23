import React, { useContext } from 'react';
import { View, Text, FlatList, Button } from 'react-native';
import { CartContext } from '../contexts/CartContext';

const Cart = () => {
  const { cartItems, removeFromCart } = useContext(CartContext);

  return (
    <View>
      <Text>Carrito de Compras</Text>
      {cartItems.length === 0 ? (
        <Text>El carrito está vacío.</Text>
      ) : (
        <FlatList
          data={cartItems}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View>
              <Text>{item.name}</Text>
              <Text>Precio: ${item.price}</Text>
              <Button title="Eliminar" onPress={() => removeFromCart(item.id)} />
            </View>
          )}
        />
      )}
    </View>
  );
};

export default Cart;
