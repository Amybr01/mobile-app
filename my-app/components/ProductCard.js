import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const ProductCard = ({title, subtitle, price, image, onPress}) => {
    const navigation = useNavigation();

    return (
        <View style={styles.card}>
            <Image source={image} style={styles.image}/>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.subtitle}>{subtitle}</Text>
            <Text style={styles.price}>€{price}</Text>

            <TouchableOpacity style={styles.button} onPress={onPress}>
                <Text style={styles.buttonText}>Bekijk product</Text>
            </TouchableOpacity>
        </View>
    );
};

export default ProductCard;

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#fff",
        padding: 12,
        borderRadius: 16,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 3,
        marginBottom: 16,
        marginHorizontal: 8,
        width: "90%", 
        gap: 8,
    },
    image: {
        width: "100%",
        height: 80,
        borderRadius: 12,
    },
    title: {
        fontWeight: "bold",
        fontSize: 16,
        marginTop: 8,
    },
    description: {
        color: "#666",
        marginTop: 4,
    },
    price: {
        fontWeight: "bold",
        marginVertical: 6,
    },
    button: {
        marginTop: 8,
        backgroundColor: "#8B4513",
        paddingVertical: 10,
        borderRadius: 8,
        alignItems: "center",
    },
    buttonText: {
        color: "#fff",
        fontWeight: "600",
    },
});
