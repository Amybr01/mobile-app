import React, { useState } from "react";

import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from '@expo/vector-icons';
import { useWishlist } from "./WishlistContext";



const ProductCard = ({ id, title, price, image, onPress }) => {
    const navigation = useNavigation();
    const { toggleWishlistItem, isInWishlist } = useWishlist();
const liked = isInWishlist(id);



    return (
        <View style={styles.card}>
            <Image source={image} style={styles.image} />
            <Text style={styles.title}>{title}</Text>


            <View style={styles.row}>
                <Text style={styles.price}>€{price}</Text>
                <TouchableOpacity onPress={() => toggleWishlistItem({ id, title, price, image })}>
                    <Ionicons
                        name={liked ? "heart" : "heart-outline"}
                        size={20}
                        color={liked ? "#CE9B36" : "#CE9B36"}
                    />
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.button} onPress={onPress}>
                <Text style={styles.buttonText}>View product</Text>
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
        height: 120,
        borderRadius: 12,
        resizeMode: "contain",

    },
    title: {
        fontWeight: "bold",
        fontSize: 16,
        marginTop: 8,
        fontFamily: "Rye",
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
        backgroundColor: "#674930",
        paddingVertical: 10,
        borderRadius: 8,
        alignItems: "center",
    },
    buttonText: {
        color: "#fff",
        fontWeight: "600",
    
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginLeft: 4,
        marginRight: 4,

    },

});
