import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import ProductCard from "../components/ProductCard";

const HomeScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("https://api.webflow.com/v2/collections/680cd71e3e86477a69c63648/items", {
      headers: {
        Authorization: "Bearer f91cd53cb2d72603a2437a426b81b6dfc1d888e9cd7a6efc695c00ac69f4629a",
        "accept-version": "1.0.0",
      },
    })
    
      .then((res) => res.json())
      .then((data) => {
        setProducts(
          data.items.map((item) => {
            
            return {
              id: item.id,
              title: item.fieldData.name,
              subtitle: item.fieldData.description,
              price: item.fieldData.price?.value / 100,
              image: { uri: item.fieldData["main-image"]?.url }, 
            };
          })
        );
      })
      
      .catch((err) => console.error("Error:", err));
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Onze modellen</Text>

      <ScrollView style={styles.cardContainer}>
        <View style={styles.row}>
          {products.map((product) => (
            <ProductCard
              key={product.id}
              title={product.title}
              subtitle={product.subtitle}
              price={product.price}
              image={product.image} 
              onPress={() => navigation.navigate("Details", product)}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 42,
    paddingHorizontal: 16,
  },
  heading: {
    fontSize: 24,
    color: "#000",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 24,
  },
  cardContainer: {
    flex: 1,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: 16,
  },
});
