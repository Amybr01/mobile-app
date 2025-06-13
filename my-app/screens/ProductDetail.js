import React, {useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import BottomNav from '../components/BottomNav';

const DetailsScreen = ({ route }) => {
  const { title, subtitle, price, image } = route.params;
  const [quantity, setQuantity] = useState(1); // we gebruiken een state voor het productaantal

  const increaseQuantity = () => setQuantity(quantity + 1); //verhoog het aantal
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1); //verlaag het aantal maar natuurlijk alleen als het boven 1 is
    }
  };

  return (
    <View style={styles.container}>
      <Image source={image} style={styles.image} />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
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
      <BottomNav />
    </View>
  );
};

export default DetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
  },
  image: {
    width: 250,
    height: 250,
    borderRadius: 12,
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 6,
  },
  price: {
    fontSize: 18,
    color: '#CC0000',
    fontWeight: 'bold',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    marginTop: 16,
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
  },
});
