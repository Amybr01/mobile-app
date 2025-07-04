import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, ActivityIndicator } from 'react-native';
import BottomNav from '../components/BottomNav';

export default function HomeScreen({ navigation }) {
  const [blogs, setBlogs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loadingBlogs, setLoadingBlogs] = useState(true);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [isPressed, setIsPressed] = useState(false);

  const productCategories = [
    { key: 'care', label: 'Horse care' },
    { key: 'outfits', label: 'Rider outfits' },
    { key: 'tack', label: 'Tack' },
  ];


  useEffect(() => {
    const headers = {
      Authorization: "Bearer f91cd53cb2d72603a2437a426b81b6dfc1d888e9cd7a6efc695c00ac69f4629a",
      "accept-version": "1.0.0",
    };

    // Fetch blogs
    fetch("https://api.webflow.com/v2/collections/680a716d4e23d1771974cfd8/items", { headers })
      .then((res) => res.json())
      .then((data) => setBlogs(data.items.slice(0, 3)))
      .catch((err) => console.error("Error fetching blogs:", err))
      .finally(() => setLoadingBlogs(false));

    // Fetch categories
    fetch("https://api.webflow.com/v2/collections/680cd71e3e86477a69c63646/items", { headers })
      .then((res) => res.json())
      .then((data) => setCategories(data.items))
      .catch((err) => console.error("Error fetching categories:", err))
      .finally(() => setLoadingCategories(false));
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView>
        {/* Logo */}
        <Image
          source={require('../assets/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />

        {/* Products */}
        <Text style={styles.sectionTitle}>Shop by category</Text>
        {loadingCategories ? (
          <ActivityIndicator size="large" color="#8B4513" style={{ marginTop: 16 }} />
        ) : (
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
            {categories.map((cat) => {
              let key = "all";
              const name = cat.fieldData.name?.toLowerCase() ?? "";

              if (name.includes("horse care") || name.includes("care")) {
                key = "care";
              } else if (name.includes("rider") || name.includes("outfits")) {
                key = "outfits";
              } else if (name.includes("tack")) {
                key = "tack";
              }

              return (
                <TouchableOpacity
                  key={cat._id || cat.fieldData.slug || cat.fieldData.name}
                  style={styles.categoryCard}
                  onPress={() => navigation.navigate('Products', { initialCategory: key })}
                >
                  {cat.fieldData["main-image"]?.url && (
                    <Image
                      source={{ uri: cat.fieldData["main-image"].url }}
                      style={styles.categoryImage}
                    />
                  )}
                  <Text style={styles.categoryText}>{cat.fieldData.name}</Text>
                </TouchableOpacity>
              );
            })}

          </ScrollView>
        )}

        <TouchableOpacity
          onPress={() => navigation.navigate('Products')}
          onPressIn={() => setIsPressed(true)}
          onPressOut={() => setIsPressed(false)}
        >
          <Text style={[styles.linkText, isPressed && styles.linkTextHover]}>Browse all essentials</Text>
        </TouchableOpacity>

        {/* Blog */}
        <Text style={styles.sectionTitle}>The cowboy’s guide</Text>
        {loadingBlogs ? (
          <ActivityIndicator size="large" color="#8B4513" style={{ marginTop: 16 }} />
        ) : (
          <>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
              {blogs.map((blog) => (
                <TouchableOpacity
                  key={blog._id || blog.fieldData.slug || blog.fieldData.name}
                  style={styles.blogCard}
                  onPress={() => navigation.navigate('BlogDetail', blog.fieldData)}
                >
                  {blog.fieldData["main-image"]?.url && (
                    <Image
                      source={{ uri: blog.fieldData["main-image"].url }}
                      style={styles.blogImage}
                    />
                  )}
                  <View style={styles.blogTextContainer}>
                    <Text style={styles.blogText}>{blog.fieldData.name}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>


            <TouchableOpacity
              onPress={() => navigation.navigate('Blogs')}
              onPressIn={() => setIsPressed(true)}
              onPressOut={() => setIsPressed(false)}
            >
              <Text style={[styles.linkText, isPressed && styles.linkTextHover]}>
                Discover more 
              </Text>
            </TouchableOpacity>
          </>
        )}
      </ScrollView>

      <BottomNav />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0e9d7' },
  logo: { width: '100%', height: 100, marginTop: 84 },
  sectionTitle: {
    fontSize: 20,
    fontFamily: "Rye",
    fontWeight: 'bold',
    marginLeft: 18,
    marginTop: 24,
    marginBottom: 12,
  },
  horizontalScroll: { paddingLeft: 16 },
  categoryCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginRight: 12,
    width: 220,
    flexDirection: 'column',
    alignItems: 'center',

    shadowColor: '#333',
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,

  },
  categoryImage: {
    width: 220,
    height: 120,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  categoryText: {
    color: '#333',
    fontWeight: '600',
    flexWrap: 'wrap',
    marginTop: 12,
    marginBottom: 12,
    textAlign: 'center',
    fontSize: 16,
  },

  blogCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginRight: 12,
    width: 220,
    flexDirection: 'column',
    alignItems: 'center',
    shadowColor: '#333',
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,

  },
  blogImage: {
    width: 220,
    height: 120,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  blogTextContainer: { width: '90%' },
  blogText: {
    color: '#333',
    fontWeight: '600',
    flexWrap: 'wrap',
    marginTop: 12,
    marginBottom: 12,
    textAlign: 'center',
    fontSize: 16,
  },


  linkText: {
    color: '#674930',
    fontWeight: 'bold',
    marginLeft: 22,
    marginTop: 8,
    marginBottom: 16,
    fontStyle: "italic",
  },

  linkTextHover: {
    textDecorationLine: 'underline',
  },


});
