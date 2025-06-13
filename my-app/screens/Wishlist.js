// screens/Wishlist.js
import React from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { useWishlist } from "../components/WishlistContext";
import ProductCard from "../components/ProductCard";
import BottomNav from "../components/BottomNav";

export default function WishlistScreen({ navigation }) {
  const { wishlist } = useWishlist();

  return (
    <View style={styles.container}>
      {wishlist.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.empty}>Your wishlist is empty... for now!</Text>
          <Text style={styles.emptyHint}>Start adding items you love 🤠</Text>
          <TouchableOpacity
            style={styles.goToProductsButton}
            onPress={() => navigation.navigate("Products")}
          >
            <Text style={styles.goToProductsButtonText}>Go to products</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.list}>
          {wishlist.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              title={product.title}
              price={product.price}
              image={product.image}
              onPress={() => navigation.navigate("ProductDetail", product)}
            />
          ))}
        </ScrollView>
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
    textAlign: "center",
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
  list: {
    paddingBottom: 100,
    alignItems: "center",
    marginTop: 42,
  },
});
