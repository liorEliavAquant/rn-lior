import React, { useRef, useEffect, useState } from 'react'
import { StyleSheet, View, Animated, Text, PanResponder, Easing, TouchableHighlight, TouchableWithoutFeedback, Vibration } from 'react-native'

const MIN_MOVE = 5;
const MAX_DX = 50;
const OVERPAN = 20;
const ITEM_HEIGHT = 80;

export const SwipeableCard = ({ style, children, onPanVertical, onPanEnd, leftClick = () => null, rightClick = () => null }) => {

    const panHorizontal = useRef(new Animated.Value(0)).current;
    const contentOpacity = useRef(new Animated.Value(1)).current;
    const pan = useRef(new Animated.ValueXY(0, 0)).current;
    const height = useRef(new Animated.Value(ITEM_HEIGHT)).current;
    const backgroundColor = useRef(new Animated.Value(0)).current;
    const prevValue = useRef(0);
    const isScrolling = useRef(false);
    const [isDragging, setIsDragging] = useState(false);

    const deleteSelf = () => {
        Animated.sequence([
            Animated.timing(panHorizontal, {
                toValue: 0,
                duration: 250,
                easing: Easing.ease,
                useNativeDriver: false
            }),
            Animated.timing(contentOpacity, {
                toValue: 0,
                duration: 250,
                easing: Easing.ease,
                useNativeDriver: false
            }),
            Animated.timing(height, {
                toValue: 0,
                duration: 400,
                easing: Easing.in,
                useNativeDriver: false,
            })
        ]).start(rightClick)
    }

    useEffect(() => {
        backgroundColor.setValue(+!isDragging)
        if (isDragging) {
            Animated.spring(panHorizontal, {
                toValue: 0,
                tension: 40,
                useNativeDriver: false
            }).start()
            prevValue.current = 0;
        }
        Animated.timing(backgroundColor, {
            duration: 300,
            toValue: (+isDragging),
            useNativeDriver: false
        }).start()
    }, [isDragging])

    const panResponder = PanResponder.create({
        onMoveShouldSetPanResponder: (_, gesture) => isDragging || Math.abs(gesture.dx) > 2 || Math.abs(gesture.dx) < -2,
        onPanResponderMove: (_, gesture) => {
            const { dx, dy } = gesture;

            if (isDragging) {
                pan.setValue({ x: dx, y: dy })
                return;
            }

            const newValAbs = Math.min(Math.abs(prevValue.current + dx), MAX_DX + OVERPAN)
            if (isScrolling.current || (Math.abs(dy) > Math.abs(dx) && Math.abs(dy) > MIN_MOVE)) {
                isScrolling.current = true;
                onPanVertical(dy);
                Animated.spring(panHorizontal, {
                    toValue: 0,
                    tension: 40,
                    useNativeDriver: false
                }).start()
                prevValue.current = 0;
            }
            else {
                panHorizontal.setValue(Math.sign(prevValue.current + dx) * (newValAbs))
            }
        },
        onPanResponderEnd: (_, gesture) => {
            if (isDragging) {
                setIsDragging(false);
                Animated.spring(pan, {
                    toValue: { x: 0, y: 0 },
                    bounciness: 100,
                    useNativeDriver: false
                }).start()
                return;
            }

            if (isScrolling.current) {
                onPanEnd(gesture.vy, gesture.dy)
                isScrolling.current = false;
                return;
            }


            if (Math.abs(panHorizontal._value) / MAX_DX > .7) {
                Animated.spring(panHorizontal, {
                    toValue: Math.sign(panHorizontal._value) * MAX_DX,
                    tension: 40,
                    useNativeDriver: false
                }).start()
                prevValue.current = Math.sign(panHorizontal._value) * MAX_DX;
            }
            else {
                Animated.spring(panHorizontal, {
                    toValue: 0,
                    tension: 40,
                    useNativeDriver: false
                }).start()
                prevValue.current = 0;
            }
        }
    })

    const onLeftClick = () => {
        if (prevValue.current > 0) {
            Animated.timing(panHorizontal, {
                toValue: 0,
                duration: 250,
                easing: Easing.ease,
                useNativeDriver: false
            }).start(leftClick);
        }
    }

    const onRightClick = () => {
        if (prevValue.current < 0) {
            deleteSelf();
        }
    }

    const startDrag = () => {
        Vibration.vibrate([100, 200, 150, 200, 200, 100,100])
        setIsDragging(true)
    }

    return (
        <View style={{
            position: 'relative',
            zIndex: isDragging ? 100 : -1,
        }} {...panResponder.panHandlers}>
            <Animated.View style={{
                ...styles.cardMain,
                ...style,
                marginVertical: height.interpolate({
                    inputRange: [0, ITEM_HEIGHT],
                    outputRange: [0, 4]
                }),
                backgroundColor: height.interpolate({
                    inputRange: [0, ITEM_HEIGHT],
                    outputRange: ['#a5a5a5', '#fff']
                }),
                height: height,
                transform: [{ translateX: pan.x }, { translateY: pan.y }]
            }}>
                <TouchableWithoutFeedback onPress={onLeftClick}>
                    <Animated.View style={{
                        ...styles.hiddenButton,
                        left: 0,
                        opacity: contentOpacity.interpolate({
                            inputRange: [0, 0.99, 1],
                            outputRange: [0, 0, 1]
                        }), backgroundColor: panHorizontal.interpolate({
                            inputRange: [0, MAX_DX, MAX_DX + OVERPAN],
                            outputRange: ['#AFAFAF', '#4ECDC4', '#4ECDC4']
                        })
                    }}>
                        <Text style={{ ...styles.hiddenButtonText, paddingRight: OVERPAN }}>🖋</Text>
                    </Animated.View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={onRightClick}>
                    <Animated.View style={{
                        ...styles.hiddenButton,
                        right: 0,
                        opacity: contentOpacity.interpolate({
                            inputRange: [0, 0.99, 1],
                            outputRange: [0, 0, 1]
                        }),
                        backgroundColor: panHorizontal.interpolate({
                            inputRange: [-1 * (MAX_DX + OVERPAN), -1 * MAX_DX, 0],
                            outputRange: ['#FF6B6B', '#FF6B6B', '#AFAFAF']
                        })
                    }}>
                        <Text style={{ ...styles.hiddenButtonText, paddingLeft: OVERPAN }}>🗑</Text>
                    </Animated.View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onLongPress={startDrag}>
                    <Animated.View style={{
                        ...styles.mainContent,
                        opacity: contentOpacity,
                        backgroundColor: backgroundColor.interpolate({
                            inputRange: [0, 1],
                            outputRange: ['#ffffff', '#aed4d1']
                        }),
                        transform: [{ translateX: panHorizontal }]
                    }}>
                        {children}
                    </Animated.View>
                </TouchableWithoutFeedback>
            </Animated.View>
        </View>
    )
}

const styles = StyleSheet.create({
    cardMain: {
        shadowColor: "#000",
        overflow: 'hidden',
        height: 80,
        marginHorizontal: 5,
        shadowOffset: {
            width: 1,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        borderRadius: 9,
        elevation: 2,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        // minHeight: 30,
    },
    mainContent: {
        ...StyleSheet.absoluteFill,
        paddingHorizontal: 8,
        borderRadius: 1,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'stretch',
        flex: 1
    },
    hiddenButton: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'stretch',
        minWidth: MAX_DX + OVERPAN
    },
    hiddenButtonText: {
        fontSize: 30
    }
})