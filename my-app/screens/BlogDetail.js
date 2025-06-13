// screens/BlogDetail.js
import React, { useEffect, useState } from "react";
import {
    StyleSheet,
    View,
    Text,
    Image,
    ScrollView,
} from "react-native";
import BottomNav from "../components/BottomNav";

export default function BlogDetail({ route }) {
    const { slug } = route.params;
    const [post, setPost] = useState(null);

    useEffect(() => {
        fetch(
            "https://api.webflow.com/v2/collections/680a716d4e23d1771974cfd8/items",
            {
                headers: {
                    Authorization:
                        "Bearer f91cd53cb2d72603a2437a426b81b6dfc1d888e9cd7a6efc695c00ac69f4629a",
                    "accept-version": "1.0.0",
                },
            }
        )
            .then(res => {
                if (!res.ok) throw new Error(`Status ${res.status}`);
                return res.json();
            })
            .then(data => {
                const item = data.items[0];
                const fd = item.fieldData;
                setPost({
                    image: fd["main-image"] ? { uri: fd["main-image"].url } : null,
                    createdOn: item.createdOn,
                    title: fd.name || "(no title)",
                    summary: fd["blog-summary"],
                    content: fd["blog-content"].replace(/<[^>]+>/g, ""),
                });
            })
            .catch(console.error);
    }, [slug]);

    if (!post) {
        return (
            <View style={styles.container}>
                <Text>Loading…</Text>
            </View>
        );
    }

    const formatDate = iso =>
        new Date(iso).toLocaleDateString("nl-NL", {
            day: "numeric",
            month: "long",
            year: "numeric",
        });

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.contentContainer}>
                {post.image && <Image source={post.image} style={styles.image} />}
                <Text style={styles.date}>{formatDate(post.createdOn)}</Text>
                <Text style={styles.title}>{post.title}</Text>

                <Text style={styles.summary}>{post.summary}</Text>
                <Text style={styles.body}>{post.content}</Text>
            </ScrollView>
            <BottomNav />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:
            "#fff"
    }, contentContainer: {
        paddingBottom: 80
    }, image: {
        width: "100%",
        height: 200,
        marginBottom: 16

    }, title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 22,
        paddingLeft: 16,
       paddingRight: 16,
    }, date: {
        fontSize: 14,
        color: "#666",
        marginBottom: 12,
        paddingLeft: 16,
       paddingRight: 16,
    }, summary: {
        fontSize: 16,
        fontStyle: "italic",
        marginBottom: 22, 
        paddingLeft: 16,
       paddingRight: 16,
    }, body: {
        fontSize: 16,
        lineHeight: 24,
        marginBottom: 24, 
       paddingLeft: 16,
       paddingRight: 16,
    },
});
