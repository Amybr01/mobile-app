import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import BottomNav from '../components/BottomNav';
import { Ionicons } from '@expo/vector-icons';
import { useWishlist } from '../components/WishlistContext';

const DetailsScreen = ({ route }) => {
  const { id, title, price, image } = route.params;
  const [quantity, setQuantity] = useState(1);
  const { toggleWishlistItem, isInWishlist } = useWishlist();
  const liked = isInWishlist(id);

  const increaseQuantity = () => setQuantity(quantity + 1);
  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleAddToCart = () => {
    console.log("🚀 In winkelmand:", { id, title, price, quantity });
    // Hier later je cart-logica
  };

  return (
    <View style={styles.container}>
      {/* Favoriet icoon */}
      <TouchableOpacity style={styles.heartIcon} onPress={() => toggleWishlistItem({ id, title, price, image })}>
        <Ionicons name={liked ? "heart" : "heart-outline"} size={36} color="#CE9B36" />
      </TouchableOpacity>

      <Image source={image} style={styles.image} />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.price}>€{price}</Text>

      <View style={styles.quantityContainer}>
        <TouchableOpacity style={styles.button} onPress={decreaseQuantity}>
          <Text style={styles.buttonText}>−</Text>
        </TouchableOpacity>

        <Text style={styles.quantityText}>{quantity}</Text>

        <TouchableOpacity style={styles.button} onPress={increaseQuantity}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.totalPrice}>Totaal: €{(price * quantity).toFixed(2)}</Text>

      <TouchableOpacity style={styles.cartButton} onPress={handleAddToCart}>
        <Text style={styles.cartButtonText}>Add to cart</Text>
      </TouchableOpacity>

      <BottomNav />
    </View>
  );
};

export default DetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    paddingTop: 32,
  },
  heartIcon: {
    position: 'absolute',
    top: 32,
    right: 32,
    zIndex: 10,
  },
  image: {
    width: 250,
    height: 250,
    resizeMode: 'contain',
    marginBottom: 32,
    marginTop: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 22,
    textAlign: 'center',
  },
  price: {
    fontSize: 18,
    marginBottom: 22,
    fontWeight: 'bold',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
    marginTop: 36,
    gap: 16,
  },
  button: {
    backgroundColor: '#8B4513',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  quantityText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    
  },
  totalPrice: {
    marginTop: 12,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#CE9B36',
    marginBottom: 24,
  },
  cartButton: {
    backgroundColor: '#8B4513',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 16,
    marginTop: 20,
    alignItems: 'center',
  },
  cartButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
