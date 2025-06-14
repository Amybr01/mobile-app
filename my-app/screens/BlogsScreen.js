import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  ActionSheetIOS
} from "react-native";
import BlogCard from "../components/BlogCard";
import BottomNav from "../components/BottomNav";

export default function BlogScreen({ navigation }) {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [dateSort, setDateSort] = useState("none");//none is default

  // IOS sort menu (ander werkte niet op emulator)
  const openDateMenu = () => {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ["Cancel", "None", "Newest first", "Oldest first"],
        cancelButtonIndex: 0,
      },
      (buttonIndex) => {
        if (buttonIndex === 1) setDateSort("none");
        else if (buttonIndex === 2) setDateSort("desc");
        else if (buttonIndex === 3) setDateSort("asc");
      }
    );
  };

  useEffect(() => {
    fetch("https://api.webflow.com/v2/collections/680a716d4e23d1771974cfd8/items", {
      headers: {
        Authorization: "Bearer f91cd53cb2d72603a2437a426b81b6dfc1d888e9cd7a6efc695c00ac69f4629a",
        "accept-version": "1.0.0",
      },
    })
      .then(res => {
        if (!res.ok) throw new Error(`Fetch failed with status ${res.status}`);
        return res.json();
      })
      .then(data => {
        const mapped = data.items.map(item => {
          const fd = item.fieldData;
          return {
            id: item._id || item.id,
            title: fd.title || fd.name || "(no title)",
            summary: fd['blog-summary'] || fd['blogSummary'] || "",
            image: fd["main-image"] ? { uri: fd["main-image"].url } : undefined,
            slug: item.fieldData.slug,

            createdOn: item.createdOn || item._createdOn

          };
        });
        setPosts(mapped);
        setFilteredPosts(mapped);
      })
      .catch(err => console.error("Error fetching blog posts:", err));
  }, []);

  // search (op volledige woorden) + sort
  useEffect(() => {
    let temp = [...posts];

    //search
    if (searchQuery.trim()) {
      const esc = s => s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
      const pattern = new RegExp(`\\b${esc(searchQuery.trim())}\\b`, 'i');
      temp = temp.filter(p => pattern.test(p.title));
    }

    //sort
    if (dateSort === "asc") {
      temp.sort((a, b) => new Date(a.createdOn) - new Date(b.createdOn));
    } else if (dateSort === "desc") {
      temp.sort((a, b) => new Date(b.createdOn) - new Date(a.createdOn));
    }
    // "none" = originele volgorde

    setFilteredPosts(temp);
  }, [posts, searchQuery, dateSort]);


  if (!posts.length) {
    return (
      <View style={styles.container}>
        <Text style={styles.emptyText}>Geen blogposts gevonden.</Text>
        <BottomNav />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* SEARCH & SORT */}
      <View style={styles.searchSortRow}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search titles…"
          value={searchQuery}
          onChangeText={setSearchQuery}
          clearButtonMode="while-editing"
          returnKeyType="search"
        />
        <TouchableOpacity style={styles.sortButton} onPress={openDateMenu}>
          <Text style={styles.sortText}>
            {dateSort === "none"  ? "🪄"
             : dateSort === "desc" ? "📅 ↓"
                                   : "📅 ↑"}
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.grid}>
        {filteredPosts.map(post => (
          <View style={styles.cardWrapper} key={post.id}>
            <BlogCard
              title={post.title}
              summary={post.summary}
              image={post.image}
              onPress={() => navigation.navigate("BlogDetail", { slug: post.slug })}


            />
          </View>
        ))}
      </ScrollView>

      <BottomNav />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 42,
    paddingHorizontal: 16,
    paddingBottom: 80,
    backgroundColor: "#F0E9D7",
  },
  emptyText: {
    textAlign: "center",
    marginTop: 20,
    color: "#333",
  },
  searchSortRow: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 16,
    marginBottom: 32,
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 12,
    marginRight: 8,
    backgroundColor: "#fff",
    fontStyle: "italic",
  },
  sortButton: {
    width: 80,
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  sortText: {
    fontSize: 14,
    color: "#333",
  },
 
 
  
});
