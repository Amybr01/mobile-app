// screens/ProductsScreen.js
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import ProductCard from "../components/ProductCard";
import BottomNav from "../components/BottomNav";

// Statische categorieën (slugs uit Webflow)
const categories = [
  { key: "all", label: "All" },
  { key: "tack", label: "Tack" },
  { key: "rider_outfits", label: "Rider Outfits" },
  { key: "horse_care", label: "Horse Care" },
];

export default function ProductsScreen({ navigation }) {
  const [products, setProducts] = useState([]);
  const [activeCat, setActiveCat] = useState("all");
  const [loading, setLoading] = useState(true);

  // Haal producten op, eventueel gefilterd op category slug
  const fetchProducts = (categoryKey = "all") => {
    setLoading(true);
    let url =
      "https://api.webflow.com/v2/collections/680cd71e3e86477a69c63648/items";

    // Voeg filter-param toe als niet "all"
    if (categoryKey !== "all") {
      url += `?fields[category][equals]=${categoryKey}`;
    }

    fetch(url, {
      headers: {
        Authorization:
          "Bearer f91cd53cb2d72603a2437a426b81b6dfc1d888e9cd7a6efc695c00ac69f4629a",
        "accept-version": "1.0.0",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const mapped = data.items.map((item) => ({
          id: item._id || item.id,
          title: item.fieldData.name,
          subtitle: item.fieldData.description,
          price: item.fieldData.price?.value / 100,
          image: { uri: item.fieldData["main-image"]?.url },
        }));
        setProducts(mapped);
      })
      .catch((err) => console.error("Error fetching products:", err))
      .finally(() => setLoading(false));
  };

  // Initial load
  useEffect(() => {
    fetchProducts();
  }, []);

  // Gebruiker selecteert filter
  const filterBy = (key) => {
    setActiveCat(key);
    fetchProducts(key);
  };

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#8B4513" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Filterbalk */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filterRow}
      >
        {categories.map((cat) => {
          const isActive = cat.key === activeCat;
          return (
            <TouchableOpacity
              key={cat.key}
              style={[
                styles.filterBtn,
                isActive ? styles.activeFilter : styles.inactiveFilter,
              ]}
              onPress={() => filterBy(cat.key)}
            >
              <Text
                style={[styles.filterText, isActive && styles.activeText]}
              >
                {cat.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Productgrid */}
      <ScrollView contentContainerStyle={styles.grid}>
        {products.map((product) => (
          <View style={styles.cardWrapper} key={product.id}>
            <ProductCard
              title={product.title}
              subtitle={product.subtitle}
              price={product.price}
              image={product.image}
              onPress={() =>
                navigation.navigate("ProductDetail", product)
              }
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
    paddingBottom: 80,
    backgroundColor: "#fff",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 18,
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
  },
  inactiveFilter: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#8B4513",
  },
  activeFilter: {
    backgroundColor: "#8B4513",
  },
  filterText: {
    fontSize: 14,
    color: "#333",
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
    marginTop: 22,
  },
  cardWrapper: {
    width: "50%",
    marginBottom: 16,
    
  },
});
