import React from "react";
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Alert } from "react-native";
import { useCart } from "../components/CartContext";
import BottomNav from "../components/BottomNav";

export default function CartScreen({ navigation }) {
  const { cartItems, removeFromCart, clearCart, updateQuantity } = useCart();

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
                <View style={styles.imageWrapper}>
                  <Image source={item.image} style={styles.image} />
                </View>

                <View style={{ flex: 1 }}>
                  <Text style={styles.title}>{item.title}</Text>

                  <View style={styles.quantityRow}>
                    <Text style={styles.itemText}>Quantity:</Text>

                    <TouchableOpacity
                      style={styles.quantityButton}
                      onPress={() => item.quantity > 1 && updateQuantity(item.id, item.quantity - 1)}
                    >
                      <Text style={styles.quantityButtonText}>−</Text>
                    </TouchableOpacity>

                    <Text style={styles.itemText}>{item.quantity}</Text>

                    <TouchableOpacity
                      style={styles.quantityButton}
                      onPress={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      <Text style={styles.quantityButtonText}>+</Text>
                    </TouchableOpacity>
                  </View>

                  <Text style={styles.itemText}>Price: €{item.price}</Text>
                  <Text style={styles.itemTotal}>Total: €{(item.price * item.quantity).toFixed(2)}</Text>
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
    backgroundColor: "#F0E9D7",
    paddingBottom: 120,
  },
  item: {
    flexDirection: "row",
    marginBottom: 8,
    marginTop: 16,
    gap: 16,
    alignItems: "center",
  },
  imageWrapper: {
    backgroundColor: '#fff',
    padding: 6,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    overflow: 'hidden',
    width: 120,
    height: 120,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: 'contain',
  },
  title: {
    fontWeight: "bold",
    marginBottom: 8,
    fontFamily: "Rye",
  },
  itemText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 4,
  },
  itemTotal: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 8,
  },
  quantityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  quantityButton: {
    backgroundColor: "#674930",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 1000,
  },
  quantityButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: 'bold',

  },
  removeText: {
    fontSize: 22,
    color: "#674930",
    marginRight: 8,
  },
  total: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 12,
  },
  orderButton: {
    backgroundColor: "#674930",
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
    color: "#333",
    marginBottom: 8,
    textAlign: "center",
  },
  emptyHint: {
    fontSize: 14,
    color: "#333",
    fontStyle: "italic",
  },
  goToProductsButton: {
    backgroundColor: "#674930",
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
