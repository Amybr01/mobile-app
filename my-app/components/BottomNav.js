import React, { useRef, useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Platform, Animated } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useCart } from '../components/CartContext';

export default function BottomNav() {
  const navigation = useNavigation();
  const route = useRoute();
  const { cartItems } = useCart();

  const badgeScale = useRef(new Animated.Value(1)).current;
  const prevCount = useRef(cartItems.length);

  useEffect(() => {
    if (cartItems.length > prevCount.current) {
      // Iets toegevoegd → animatie
      Animated.sequence([
        Animated.timing(badgeScale, { toValue: 1.4, duration: 100, useNativeDriver: true }),
        Animated.timing(badgeScale, { toValue: 1, duration: 100, useNativeDriver: true }),
      ]).start();
    }
    prevCount.current = cartItems.length;
  }, [cartItems.length]);

  const tabs = [
    { name: 'Home', label: 'Home', icon: 'home-outline' },
    { name: 'Products', label: 'Products', icon: 'pricetag-outline' },
    { name: 'Wishlist', label: 'Wishlist', icon: 'heart-outline' },
    { name: 'Blogs', label: 'Blog', icon: 'book-outline' },
    { name: 'Cart', label: 'Cart', icon: 'cart-outline' },
  ];

  return (
    <View style={styles.container}>
      {tabs.map(tab => {
        const isActive = route.name === tab.name;
        return (
          <TouchableOpacity
            key={tab.name}
            style={styles.tab}
            onPress={() => navigation.navigate(tab.name)}
          >
            <View>
              <Ionicons
                name={tab.icon}
                size={24}
                color={isActive ? '#CE9B36' : '#333'}
              />
              {tab.name === 'Cart' && cartItems.length > 0 && (
                <Animated.View style={[styles.badge, { transform: [{ scale: badgeScale }] }]}>
                  <Text style={styles.badgeText}>
                    {cartItems.length > 9 ? '9+' : cartItems.length}
                  </Text>
                </Animated.View>
              )}
            </View>
            <Text style={[styles.label, isActive && styles.activeLabel]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingVertical: Platform.OS === 'ios' ? 20 : 8,
    borderTopWidth: 1,
    borderColor: '#ddd',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  label: {
    fontSize: 12,
    color: '#333',
    marginTop: 2,
  },
  activeLabel: {
    color: '#CE9B36',
    fontWeight: 'bold',
  },
  badge: {
    position: 'absolute',
    right: -10,
    top: -6,
    backgroundColor: '#CE9B36',
    borderRadius: 8,
    minWidth: 16,
    height: 16,
    paddingHorizontal: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
});
