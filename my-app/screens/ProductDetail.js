import React, { useState, useRef  } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Animated, Dimensions } from 'react-native';
import BottomNav from '../components/BottomNav';
import { Ionicons } from '@expo/vector-icons';
import { useWishlist } from '../components/WishlistContext';
import { useCart } from "../components/CartContext";

const DetailsScreen = ({ route }) => {
  const { id, title, price, image } = route.params;
  const [quantity, setQuantity] = useState(1);
  const { toggleWishlistItem, isInWishlist } = useWishlist();
  const liked = isInWishlist(id);
   const { width, height } = Dimensions.get('window');
  const [showFly, setShowFly] = useState(false);
  const flyAnimX = useRef(new Animated.Value(0)).current;
  const flyAnimY = useRef(new Animated.Value(0)).current;

  const increaseQuantity = () => setQuantity(quantity + 1);
  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const { addToCart } = useCart();
  const handleAddToCart = () => {
        setShowFly(true);

    flyAnimX.setValue(0);
    flyAnimY.setValue(0);

      Animated.sequence([
  Animated.parallel([
    Animated.timing(flyAnimX, {
      toValue: 180, // naar rechts
      duration: 400,
      useNativeDriver: true,
    }),
    Animated.timing(flyAnimY, {
      toValue: -100, // omhoog
      duration: 400,
      useNativeDriver: true,
    }),
  ]),
  Animated.timing(flyAnimY, {
    toValue: 0, // terug omlaag
    duration: 400,
    useNativeDriver: true,
  })
]).start(() => {
  setShowFly(false);
});


    console.log("In winkelmand:", { id, title, price, quantity });
    addToCart({
      id: route.params.id,
      title,
      price,
      quantity,
      image,
    });
    console.log("In winkelmand:", {
      id: route.params.id,
      title,
      price,
      quantity,
    });
  };


  return (
    <View style={styles.container}>
      {/* Favoriet icoon */}
      <TouchableOpacity style={styles.heartIcon} onPress={() => toggleWishlistItem({ id, title, price, image })}>
        <Ionicons name={liked ? "heart" : "heart-outline"} size={36} color="#CE9B36" />
      </TouchableOpacity>

      <View style={styles.imageWrapper}>
        <Image source={image} style={styles.image} />
      </View>
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

      {showFly && (
        <Animated.Text
          style={{
            position: 'absolute',
            bottom: 100, 
            left: width / 2 - 30,
            fontSize: 24,
            transform: [
              { translateX: flyAnimX },
              { translateY: flyAnimY }
            ]
          }}
        >
          🤠
        </Animated.Text>
      )}

      <BottomNav />
    </View>
  );
};

export default DetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#f0e9d7',
    padding: 16,
    paddingTop: 32,
  },
  heartIcon: {
    position: 'absolute',
    top: 46,
    right: 28,
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
    fontFamily: "Rye",
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
    marginTop: 12,
    gap: 16,
  },
  button: {
    backgroundColor: '#674930',
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
    marginTop: 16,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#CE9B36',
    marginBottom: 22,
  },
  cartButton: {
    backgroundColor: '#674930',
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


  imageWrapper: {
  backgroundColor: '#fff', 
  padding: 4,          
  borderRadius: 16,             
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: 22,    
  marginTop: 12,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 4,
  elevation: 3,  
},
});
