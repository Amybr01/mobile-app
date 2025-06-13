// ./screens/BlogsScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import BottomNav from '../components/BottomNav';

export default function BlogsScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Blogs overzicht (placeholder)</Text>
       <BottomNav />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  text: { fontSize: 18 },
});
