// components/BottomNav.js
import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Platform } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

export default function BottomNav() {
  const navigation = useNavigation();
  const route = useRoute();

  const tabs = [
    { name: 'Home',     label: 'Home',       icon: 'home-outline' },
    { name: 'Products', label: 'Products',   icon: 'pricetag-outline' },
    { name: 'Wishlist', label: 'Wishlist',   icon: 'heart-outline' },
    { name: 'Blogs',    label: 'Blog',       icon: 'book-outline' },
    { name: 'Cart',     label: 'Cart',       icon: 'cart-outline' },
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
            <Ionicons
              name={tab.icon}
              size={24}
              color={isActive ? '#CE9B36' : '#333'}
            />
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
    // tabs have flex:1, zodat ze gelijk verdeeld zijn
    backgroundColor: '#fff',
    paddingVertical: Platform.OS === 'ios' ? 20 : 8,
    borderTopWidth: 1,
    borderColor: '#ddd',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    

  
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
});

