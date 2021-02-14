import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { StyleSheet, View, Text } from 'react-native'
import { SwipeableCard } from './SwipableCard'
import { useBlogsContext } from '../blogs.context'

export const PostItem = ({ post, onPanVertical, onPanStart, onPanEnd }) => {

    const navigation = useNavigation();
    const { actions } = useBlogsContext();
    return (
        <SwipeableCard
            onPanVertical={onPanVertical}
            onPanEnd={onPanEnd}
            onPanStart={onPanStart}
            style={styles.item}
            leftClick={() => navigation.navigate('edit', { postId: post.id })}
            rightClick={() => actions.deletePost(post)}
        >
            <View style={styles.grabIndicator} />
            <View style={styles.itemTexts}>
                <Text style={styles.itemTitle}>{post.title}</Text>
                <Text style={styles.itemText} numberOfLines={2}>{post.text}</Text>
            </View>
        </SwipeableCard>
    )
}

const styles = StyleSheet.create({
    item: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    grabIndicator: {
        padding: 7,
        marginRight: 5,
        borderRadius: 8,
        backgroundColor: '#C08497'
    },
    itemTexts: {
        flex: 1,
        marginRight: 5
    },
    itemTitle: {
        fontSize: 15,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#292F36'
    },
    itemText: {
        fontSize: 13,
        paddingLeft: 5,
        color: '#292F36'
    }
})