// screens/BlogScreen.js
import React, { useEffect, useState } from "react";
import {
    StyleSheet,
    View,
    ScrollView,
    Text,
} from "react-native";
import BlogCard from "../components/BlogCard";
import BottomNav from "../components/BottomNav";

export default function BlogScreen({ navigation }) {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetch(
            "https://api.webflow.com/v2/collections/680a716d4e23d1771974cfd8/items",//blogs
            {
                headers: {
                    Authorization:
                        "Bearer f91cd53cb2d72603a2437a426b81b6dfc1d888e9cd7a6efc695c00ac69f4629a",
                    "accept-version": "1.0.0",
                },
            }
        )
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`Fetch failed with status ${res.status}`);
                }
                return res.json();
            })
            .then((data) => {
                const mapped = data.items.map((item) => {
                    const fd = item.fieldData;
                    return {
                        id: item._id || item.id,
                        title: fd.title || fd.name || "(no title)",
                        summary: fd['blog-summary'] || fd['blogSummary'] || "", //ipv summary want noemt zo in webflow
                        image: fd["main-image"] ? { uri: fd["main-image"].url } : undefined,
                        slug: item.slug,
                    };
                });
                console.log("Mapped posts:", mapped);
                setPosts(mapped);
            })
            .catch((err) => console.error("Error fetching blog posts:", err));
    }, []);

    if (!posts || posts.length === 0) {
        return (
            <View style={styles.container}>
                <Text style={styles.emptyText}>Geen blogposts gevonden.</Text>
                <BottomNav />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.grid}>
                {posts.map((post) => (
                    <View style={styles.cardWrapper} key={post.id}>
                        <BlogCard
                            title={post.title}
                            summary={post.summary}
                            image={post.image}
                            onPress={() =>
                                navigation.navigate("BlogDetail", { slug: post.slug })
                            }

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
        backgroundColor: "#fff",
      
    },
    

});
