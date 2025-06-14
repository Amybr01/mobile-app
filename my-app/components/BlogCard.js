// components/BlogCard.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

export default function BlogCard({ title, summary, image, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      {image && <Image source={image} style={styles.image} />}
      <View style={styles.textContainer}>
        <Text style={styles.title} numberOfLines={3}>
          {title}
        </Text>
        <Text style={styles.summary} numberOfLines={3}>
          {summary}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
card: {
  backgroundColor: '#fff',
  borderRadius: 16,
  marginBottom: 24,
  shadowColor: '#333',
  shadowOpacity: 0.2,
  shadowRadius: 6,
  shadowOffset: { width: 0, height: 2 },
  elevation: 3,
},
  image: {
    width: '100%',
    height: 150,
     borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  textContainer: {
    padding: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 6,
    fontFamily: "rye",
    maxWidth: "90%"
  },
  summary: {
    fontSize: 14,
    color: '#333',
    fontStyle: "italic",
  },
});
