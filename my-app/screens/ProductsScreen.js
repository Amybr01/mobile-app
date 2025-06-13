// screens/ProductsScreen.js
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import ProductCard from "../components/ProductCard";
import BottomNav from "../components/BottomNav";

const categories = [
  { key: "all", label: "Alles" },
  { key: "tack", label: "Tack" },
  { key: "rider_outfits", label: "Rider Outfits" },
  { key: "horse_care", label: "Horse Care" },
];

export default function ProductsScreen({ navigation }) {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [activeCat, setActiveCat] = useState("all");

  useEffect(() => {
    fetch(
      "https://api.webflow.com/v2/collections/680cd71e3e86477a69c63648/items",
      {
        headers: {
          Authorization:
            "Bearer f91cd53cb2d72603a2437a426b81b6dfc1d888e9cd7a6efc695c00ac69f4629a",
          "accept-version": "1.0.0",
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        const mapped = data.items.map((item) => ({
          id: item._id || item.id,
          title: item.fieldData.name,
          subtitle: item.fieldData.description,
          price: item.fieldData.price?.value / 100,
          image: { uri: item.fieldData["main-image"]?.url },
          category: item.fieldData.category, // check hier of dit écht matcht met 'tack', etc.
        }));
        setProducts(mapped);
        setFiltered(mapped);
      })
      .catch((err) => console.error("Error:", err));
  }, []);

  const filterBy = (key) => {
    setActiveCat(key);
    setFiltered(key === "all" ? products : products.filter((p) => p.category === key));
  };

  return (
    <View style={styles.container}>

      {/* FILTERBALK */}
      <View style={styles.filterRow}>
        {categories.map((cat) => (
          <TouchableOpacity
            key={cat.key}
            style={[
              styles.filterBtn,
              activeCat === cat.key && styles.activeFilter,
            ]}
            onPress={() => filterBy(cat.key)}
          >
            <Text
              style={[
                styles.filterText,
                activeCat === cat.key && styles.activeText,
              ]}
            >
              {cat.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* PRODUCTEN GRID */}
      <ScrollView contentContainerStyle={styles.grid}>
        {filtered.map((product) => (
          <View style={styles.cardWrapper} key={product.id}>
            <ProductCard
              title={product.title}
              subtitle={product.subtitle}
              price={product.price}
              image={product.image}
              onPress={() => navigation.navigate("ProductDetail", product)}
            />
          </View>
        ))}
      </ScrollView>

      <BottomNav />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 42,
    paddingHorizontal: 16,
    paddingBottom: 80,       // ruimte voor de BottomNav
    backgroundColor: "#fff",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 16,
  },
  filterRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  filterBtn: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: "#f0f0f0",
  },
  activeFilter: {
    backgroundColor: "#8B4513",
  },
  filterText: {
    color: "#333",
    fontSize: 14,
  },
  activeText: {
    color: "#fff",
    fontWeight: "bold",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingBottom: 16,
    marginTop: 24,
  },
  cardWrapper: {
    width: "50%",           
    marginBottom: 16,
  },
});
