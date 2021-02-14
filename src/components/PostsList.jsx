import React, { useRef, useEffect } from 'react'
import { StyleSheet, Animated } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { useBlogsContext } from '../blogs.context'
import { PostItem } from './PostItem'

export const PostsList = () => {
    const { blogState, actions } = useBlogsContext();
    const ref = useRef()
    const prevScroll = useRef(0)

    const onPanVertical = (dy) => {
        if (!ref.current) {
            return;
        }
        ref.current.scrollToOffset({ offset: prevScroll.current - dy });
    }

    const onPanEnd = (velocity, dy) => {
        prevScroll.current = prevScroll.current - dy;
        ref.current.scrollToOffset({ offset: prevScroll.current });
    }

    return (
        <FlatList
            ref={ref}
            style={styles.list}
            data={blogState.posts}
            keyExtractor={item => item.id.toString()}
            renderItem={elem => <PostItem onPanVertical={onPanVertical} onPanEnd={onPanEnd} index={elem.index} post={elem.item} />}
        />
    )
}

const styles = StyleSheet.create({
    list: {
        marginVertical: 20,
        paddingHorizontal: 20
    }
})


const scrollDecay = (velocity, decay, setFunc) => {
    let startTime = null;
    let currentVelocity = velocity;

    const updateScroll = (timestamp) => {
        startTime = startTime || timestamp;
        const elpased = timestamp - startTime;
        currentVelocity = currentVelocity - (currentVelocity * (decay * (elpased) / 1000));

        if (Math.abs(currentVelocity) > 0.0001 &&  Math.sign(currentVelocity) === Math.sign(velocity)) {
            window.requestAnimationFrame(updateScroll);
            setFunc(-1 * currentVelocity * elpased / 18);
        }
    }
    return updateScroll;
}