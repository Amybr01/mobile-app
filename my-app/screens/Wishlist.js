// screens/Wishlist.js
import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { useWishlist } from "../components/WishlistContext";
import ProductCard from "../components/ProductCard";

export default function WishlistScreen({ navigation }) {
  const { wishlist } = useWishlist();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Jouw wishlist</Text>

      {wishlist.length === 0 ? (
        <Text style={styles.empty}>Je hebt nog geen favoriete producten.</Text>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  empty: {
    fontSize: 16,
    color: "#777",
  },
  list: {
    paddingBottom: 100,
  },
});
