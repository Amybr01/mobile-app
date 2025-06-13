// ProductsScreen.js
import React, { useEffect, useState } from "react";
import { View, ScrollView, TouchableOpacity, Text, StyleSheet } from "react-native";
import ProductCard from "../components/ProductCard";
import BottomNav from "../components/BottomNav";

export default function ProductsScreen({ navigation }) {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [activeCat, setActiveCat] = useState("all");

  useEffect(() => {
    const headers = {
      Authorization: "Bearer f91cd53cb2d72603a2437a426b81b6dfc1d888e9cd7a6efc695c00ac69f4629a",
      "accept-version": "1.0.0",
    };

    fetch("https://api.webflow.com/v2/collections/680cd71e3e86477a69c63646/items", { headers }) //was eigenlijk voor categorieen maar nu eigenlijk niet meer nodig :()
      .then((res) => res.json())
      .then((data) => {
        const item = data.items[0];
        const mappedCategories = data.items.map((cat) => ({
          id: cat.id,
          label: cat.fieldData.name,
          key: cat.fieldData.slug,
          productIds: cat.fieldData.products?.map((p) => p.id) || [],
        }));

        setCategories([
          { key: "all", label: "All" },
          { key: "care", label: "Horse care" },
          { key: "outfits", label: "Rider outfits" },
          { key: "tack", label: "Tack" },
        ]);

      })
      .catch((err) => console.error("Error fetching categories:", err));


    // Haal producten op
    fetch("https://api.webflow.com/v2/collections/680cd71e3e86477a69c63648/items", { headers })
      .then((res) => res.json())
      .then((data) => {
        const mappedProducts = data.items.map((item, i) => {
          const name = item.fieldData.name?.toLowerCase() ?? "";

          let categorySlug = "unknown";
          if (name.includes("bridle") || name.includes("bit") || name.includes("boots")) {
            categorySlug = "tack";
          } else if (name.includes("hat") || name.includes("bronco") || name.includes("western boots")) {
            categorySlug = "outfits";
          } else if (name.includes("cavalor")) {
            categorySlug = "care"; 
            // zo moeten doen omdat door ecommerce ik de categorieen niet uit webflow kon halen door refernce
          }

          return {
            id: item._id ?? `fallback-${i}`,
            title: item.fieldData.name,
            subtitle: item.fieldData.description,
            price: item.fieldData.price?.value / 100,
            image: { uri: item.fieldData["main-image"]?.url },
            categorySlug,
          };
        });





        setProducts(mappedProducts);
        setFiltered(mappedProducts);
      })

      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  const filterBy = (key) => {
    setActiveCat(key);
    if (key === "all") {
      setFiltered(products);
    } else {
      setFiltered(products.filter((p) => p.categorySlug === key));
    }
  };


  return (
    <View style={styles.container}>
      {/* FILTERBALK */}
      <View style={styles.filterRow}>
        {categories.map((cat) => (
          <TouchableOpacity
            key={cat.key}
            style={[styles.filterBtn, activeCat === cat.key && styles.activeFilter]}
            onPress={() => filterBy(cat.key)}
          >
            <Text style={[styles.filterText, activeCat === cat.key && styles.activeText]}>
              {cat.label}
            </Text>
          </TouchableOpacity>
        ))}

      </View>

      {/* PRODUCTEN GRID */}
      <ScrollView contentContainerStyle={styles.grid}>
        {filtered.map((product, index) => (
          <View
            style={styles.cardWrapper}
            key={product.id ?? `product-${index}`}
          >
            <ProductCard
            id={product.id}
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
    paddingBottom: 80,
    backgroundColor: "#fff",
  },
  filterRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
    marginLeft: 16,
     marginRight: 16,
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
    marginBottom: 12,
  },
});
