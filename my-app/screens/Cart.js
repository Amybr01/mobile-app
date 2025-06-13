// screens/Cart.js
import React from "react";
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Alert } from "react-native";
import { useCart } from "../components/CartContext";
import BottomNav from "../components/BottomNav";

export default function CartScreen({ navigation }) {
  const { cartItems, removeFromCart, clearCart } = useCart();

  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleOrder = () => {
    Alert.alert("Yeehaw!", "Your order has been placed! 🤠");
    clearCart();
  };

  return (
    <View style={styles.container}>
      {cartItems.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.empty}>Your cart is empty... for now!</Text>
          <Text style={styles.emptyHint}>Why not rustle up some gear? 🤠</Text>
          <TouchableOpacity
            style={styles.goToProductsButton}
            onPress={() => navigation.navigate("Products")}
          >
            <Text style={styles.goToProductsButtonText}>Go to products</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <ScrollView>
            {cartItems.map((item, index) => (
              <View key={item.id ?? index} style={styles.item}>
                <Image source={item.image} style={styles.image} />
                <View style={{ flex: 1 }}>
                  <Text style={styles.title}>{item.title}</Text>
                  <Text>Quantity: {item.quantity}</Text>
                  <Text>Price: €{item.price}</Text>
                  <Text>Total: €{(item.price * item.quantity).toFixed(2)}</Text>
                </View>
                <TouchableOpacity onPress={() => removeFromCart(item.id)}>
                  <Text style={styles.removeText}>✕</Text>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>

          <Text style={styles.total}>Total: €{total.toFixed(2)}</Text>

          <TouchableOpacity style={styles.orderButton} onPress={handleOrder}>
            <Text style={styles.orderButtonText}>Place order</Text>
          </TouchableOpacity>
        </>
      )}
      <BottomNav />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
    paddingBottom: 120,
  },
  item: {
    flexDirection: "row",
    marginBottom: 16,
    gap: 12,
    alignItems: "center",
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  title: {
    fontWeight: "bold",
    marginBottom: 4,
  },
  removeText: {
    fontSize: 22,
    color: "#8B4513",
    marginLeft: 8,
  },
  total: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 12,
  },
  orderButton: {
    backgroundColor: "#CE9B36",
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 12,
    marginTop: 12,
    alignItems: "center",
    alignSelf: "center",
    width: "90%",
  },
  orderButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 80,
  },
  empty: {
    fontSize: 16,
    color: "#777",
    marginBottom: 8,
    textAlign: "center",
  },
  emptyHint: {
    fontSize: 14,
    color: "#aaa",
    fontStyle: "italic",
  },
  goToProductsButton: {
    backgroundColor: "#8B4513",
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 12,
    marginTop: 20,
    alignItems: "center",
    alignSelf: "center",
    width: "90%",
  },
  goToProductsButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
