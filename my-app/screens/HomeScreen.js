import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import ProductCard from "../components/ProductCard";

import clothesImage from "../assets/clothes.jpeg";
import tackImage from "../assets/tack.jpg";

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Onze modellen</Text>

      <ScrollView style={styles.cardContainer}>
        <View style={styles.row}>
          <ProductCard
            title="Jeans jacket"
            subtitle="Blue embroided jean jacket"
            price="89"
            image={clothesImage}
            onPress={() =>
              navigation.navigate("Details", {
                  title: "Jeans jacket",
                  subtitle: "Blue embroided jean jacket",
                  price: "89",
              })
            }
          />

          <ProductCard
            title="Western saddle"
            subtitle="Beautiful brown leather saddle"
            price="999"
            image={tackImage}
            onPress={() =>
              navigation.navigate("Details", {
                  title: "Western saddle",
                  subtitle: "Beautiful brown leather saddle",
                  price: "999",
              })
            }
          />
        </View>
      </ScrollView>

      <StatusBar style="auto" />
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
    marginBottom: 16,
  },
});
