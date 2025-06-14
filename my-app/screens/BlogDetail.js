// screens/BlogDetail.js
import React, { useEffect, useState } from "react";
import RenderHTML from 'react-native-render-html';
import {
    StyleSheet,
    View,
    Text,
    Image,
    ScrollView,
} from "react-native";
import BottomNav from "../components/BottomNav";
import { useWindowDimensions } from 'react-native';



export default function BlogDetail({ route }) {
    const { slug } = route.params;
    const [post, setPost] = useState(null);
    const { width } = useWindowDimensions();

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
                const item = data.items.find(it => it.fieldData.slug === slug);
                if (!item) {
                    throw new Error("Post not found");
                }
                const fd = item.fieldData;
                setPost({
                    image: fd["main-image"] ? { uri: fd["main-image"].url } : null,
                    createdOn: item.createdOn,
                    title: fd.name || "(no title)",
                    summary: fd["blog-summary"],
                    slug: fd.slug,
                    content: fd["blog-content"] || "",

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

                        <RenderHTML
                            contentWidth={width}
                            source={{ html: post.content }}
                            tagsStyles={{
                                p: { fontSize: 14, marginBottom: -6, lineHeight: 18, marginLeft: 16, marginRight: 16 },
                                strong: { fontWeight: 400,  },
                                 h3: { fontSize: 16, fontWeight: '600', marginBottom: 8, marginLeft: 16, marginRight: 16  },

                                em: { fontStyle: 'italic' },
                                ul: { marginBottom: 4, marginTop: 16, },
                                li: { marginBottom: 6 , }
                            }}
                        />
                    </ScrollView>
            <BottomNav />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:
            "#f0e9d7"
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
        fontFamily: "Rye",
    }, date: {
        fontSize: 14,
        color: "#666",
        marginBottom: 12,
        paddingLeft: 16,
        paddingRight: 16,
    }, summary: {
        fontSize: 16,
        fontStyle: "italic",
        fontWeight: 500,
        marginBottom: 22,
        paddingLeft: 16,
        paddingRight: 16,
    }, 
});
