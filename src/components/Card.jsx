import React from 'react'
import { StyleSheet, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'

export const Card = ({ style, children }) => {
    return (
        <ScrollView style={{
            ...styles.cardMain,
            ...style
        }}>
        {children}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    cardMain: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        padding: 8,
        elevation: 6,
        backgroundColor: 'white',
        borderRadius: 9,
        minHeight: 30
    }
})