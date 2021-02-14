import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { useBlogsContext } from '../blogs.context';
import { Card } from '../components/Card';
import { EditableField } from '../components/EditableField';

export const EditPost = ({ route, navigation }) => {
    const { blogState, actions } = useBlogsContext();

    const [postHeading, setPostHeading] = useState('')
    const [postText, setPostText] = useState('')
    const [post, setPost] = useState(null)

    useEffect(() => {
        let foundPost;
        if (route.params?.postId && (foundPost = blogState.posts.find(post => post.id === route.params.postId))) {
            setPost(foundPost);
            setPostHeading(foundPost.title)
            setPostText(foundPost.text)
        }
    }, [])

    const updatePost = () => {
        actions.createPost({ title: postHeading, text: postText, id: post?.id });
        navigation.goBack();
    }

    return (
        <View style={styles.main}>
            <Text style={styles.heading}>
                {post ? 'Edit' : 'Create'} Post Page
            </Text>
            <Card style={styles.card}>
                <EditableField placeholder={'Title'} value={postHeading} setValue={setPostHeading} style={styles.postHeading} />
                <EditableField placeholder={'Text'} value={postText} setValue={setPostText} style={styles.postText} />
            </Card>
            <TouchableOpacity style={styles.createButton} onPress={updatePost}>
                <Text style={styles.createButtonText}>{post ? 'Save 💾' : 'Create 🎇'}</Text>
            </TouchableOpacity>

        </View>
    )
}

const styles = StyleSheet.create({
    heading: {
        fontSize: 35,
        textAlign: 'center',
        marginTop: 35,
        marginBottom: 15,
        color: '#292F36'
    },
    postHeading: {
        textAlign: 'center',
        fontSize: 25,
        fontWeight: 'bold',
        color: '#292F36'
    },
    postText: {
        marginTop: 15,
        fontSize: 21,
        textAlign: 'center',
        color: '#292F36'
    },
    createButton: {
        alignSelf: 'center',
        paddingVertical: 10,
        paddingHorizontal: 30,
        backgroundColor: '#FF6B6B',
        borderRadius: 9,
        marginBottom: 15
    },
    createButtonText: {
        color: 'white',
        fontSize: 21
    },
    card: {
        marginHorizontal: 15,
        marginVertical: 40
    },
    main: {
        display: 'flex',
        alignItems: 'stretch',
        ...StyleSheet.absoluteFill
    }
})