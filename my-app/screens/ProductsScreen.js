// ProductsScreen.js
import React, { useEffect, useState } from "react";

import ProductCard from "../components/ProductCard";
import BottomNav from "../components/BottomNav";

import { View, ScrollView, TouchableOpacity, Text, StyleSheet, TextInput } from "react-native";
import { ActionSheetIOS } from "react-native";



export default function ProductsScreen({ navigation, route }) {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [activeCat, setActiveCat] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("none"); // “none” | “asc” | “desc”
  const openSortMenu = () => {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        // nú 4 opties, dus index 0=tap Cancel, 1=none, 2=asc, 3=desc
        options: ["Cancel", "None", "Price ascending", "Price descending"],
        cancelButtonIndex: 0,
      },
      (buttonIndex) => {
        if (buttonIndex === 1) setSortOrder("none");
        else if (buttonIndex === 2) setSortOrder("asc");
        else if (buttonIndex === 3) setSortOrder("desc");
      }
    );
  };

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
            price: item.fieldData.price?.value / 100,
            image: { uri: item.fieldData["main-image"]?.url },
            categorySlug,
          };
        });

        setProducts(mappedProducts);


        const initial = route.params?.initialCategory || "all";
        setActiveCat(initial);

        if (initial === "all") {
          setFiltered(mappedProducts);
        } else {
          setFiltered(mappedProducts.filter((p) => p.categorySlug === initial));
        }
      })

      .catch((err) => console.error("Error fetching products:", err));
  }, []);
  const filterBy = (key) => {
    setActiveCat(key);
  };



  useEffect(() => {
    //categorie‐filter
    let temp = activeCat === "all"
      ? [...products]
      : products.filter(p => p.categorySlug === activeCat);

    // zoeken
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      temp = temp.filter(p => p.title.toLowerCase().includes(q));
    }

    // prijs‐sortering
    if (sortOrder === "asc") {
      temp.sort((a, b) => a.price - b.price);
    } else if (sortOrder === "desc") {
      temp.sort((a, b) => b.price - a.price);
    }
    // bij "none" = originele volgorde

    setFiltered(temp);
  }, [products, activeCat, searchQuery, sortOrder]);





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

      {/* ZOEKBALK + SORTEREN */}
      <View style={styles.searchSortRow}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search products…"
          placeholderTextColor="#888"
          value={searchQuery}
          onChangeText={setSearchQuery}
          clearButtonMode="while-editing"
          returnKeyType="search"
          editable={true}
          autoFocus={false}
          selectionColor="#8B4513"
        />
        <TouchableOpacity style={styles.sortButton} onPress={openSortMenu}>
          <Text style={styles.sortText}>
            {sortOrder === "none"
              ? "🪄"           
              : sortOrder === "asc"
                ? "€ ↑"
                : "€ ↓"}
          </Text>
        </TouchableOpacity>

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
    backgroundColor: "#F0E9D7",
  },
  filterRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
    marginLeft: 16,
    marginRight: 16,
  },
  filterBtn: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: "#fff",
     borderWidth: 0.5, 
    borderColor: "#ccc",
  },
  activeFilter: {
    backgroundColor: "#674930",
  },
  filterText: {
    color: "#333",
    fontSize: 16,
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

  searchSortRow: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 16,
    marginBottom: 16,
    marginTop: 16,
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 12,
    marginRight: 8,
    backgroundColor: "#fff",
  },
  sortButton: {
    width: 80,
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  sortText: {
    fontSize: 14,
    color: "#333",
  },


});
