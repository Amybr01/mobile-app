import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, ActivityIndicator } from 'react-native';
import BottomNav from '../components/BottomNav';

export default function HomeScreen({ navigation }) {
  const [blogs, setBlogs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loadingBlogs, setLoadingBlogs] = useState(true);
  const [loadingCategories, setLoadingCategories] = useState(true);

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

        {/* Our Products */}
        <Text style={styles.sectionTitle}>Our Products</Text>
        {loadingCategories ? (
          <ActivityIndicator size="large" color="#8B4513" style={{ marginTop: 16 }} />
        ) : (
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
            {categories.map((cat) => {
              // bepaal key op basis van naam (je kunt dit uitbreiden of dynamisch maken als je wilt)
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
                  key={cat._id}
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

        <TouchableOpacity onPress={() => navigation.navigate('Products')}>
          <Text style={styles.linkText}>Browse all essentials</Text>
        </TouchableOpacity>

        {/* Our Blog */}
        <Text style={styles.sectionTitle}>Our Blog</Text>
        {loadingBlogs ? (
          <ActivityIndicator size="large" color="#8B4513" style={{ marginTop: 16 }} />
        ) : (
          <>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
              {blogs.map((blog) => (
                <TouchableOpacity
                  key={blog._id}
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

            <TouchableOpacity onPress={() => navigation.navigate('Blogs')}>
              <Text style={styles.linkText}>Discover more tips & tricks</Text>
            </TouchableOpacity>
          </>
        )}
      </ScrollView>

      <BottomNav />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  logo: { width: '100%', height: 100, marginTop: 64 },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 18,
    marginTop: 24,
    marginBottom: 12,
  },
  horizontalScroll: { paddingLeft: 16 },
  categoryCard: {
    backgroundColor: '#CE9B36',
    borderRadius: 8,
    marginRight: 12,
    width: 220,
    flexDirection: 'column',
    alignItems: 'center',
    overflow: 'hidden',
  },
  categoryImage: {
    width: 220,
    height: 120,
    borderRadius: 8,
  },
  categoryText: {
    color: '#fff',
    color: '#fff',
    fontWeight: '600',
    flexWrap: 'wrap',
    marginTop: 12,
    marginBottom: 12,
    textAlign: 'center',
  },

  blogCard: {
    backgroundColor: '#CE9B36',
    borderRadius: 8,
    marginRight: 12,
    width: 220,
    flexDirection: 'column',
    alignItems: 'center',
    overflow: 'hidden',
  },
  blogImage: {
    width: 220,
    height: 120,
    borderRadius: 8,
  },
  blogTextContainer: { width: '90%' },
  blogText: {
    color: '#fff',
    fontWeight: '600',
    flexWrap: 'wrap',
    marginTop: 12,
    marginBottom: 12,
    textAlign: 'center',
  },


  linkText: {
    color: '#8B4513',
    fontWeight: 'bold',
    marginLeft: 18,
    marginTop: 8,
    marginBottom: 16,
  },


});
