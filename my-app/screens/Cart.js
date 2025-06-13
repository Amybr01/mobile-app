import React from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import { useCart } from "../components/CartContext";
import BottomNav from "../components/BottomNav";
import { TouchableOpacity } from 'react-native';


export default function CartScreen() {
  const { cartItems, removeFromCart } = useCart();


  const totaal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);


  return (
    <View style={styles.container}>
      <ScrollView>
        {cartItems.map((item, index) => (
          <View key={item.id ?? index} style={styles.item}>
            <Image source={item.image} style={styles.image} />
            <View>
              <Text style={styles.title}>{item.title}</Text>
              <Text>Aantal: {item.quantity}</Text>
              <Text>Prijs: €{item.price}</Text>
              <Text>Totaal: €{(item.price * item.quantity).toFixed(2)}</Text>
            </View>
            <TouchableOpacity onPress={() => removeFromCart(item.id)}>
              <Text style={styles.removeText}>✕</Text>
            </TouchableOpacity>
          </View>

        ))}
      </ScrollView>
      <Text style={styles.total}>Totaal te betalen: €{totaal.toFixed(2)}</Text>
      <BottomNav />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
    paddingBottom: 80
  },
  item: {
    flexDirection: "row",
    marginBottom: 16,
    gap: 12
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 8
  },
  title: {
    fontWeight: "bold"
  },
  total: {
    marginTop: 16,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center"
  },
});
