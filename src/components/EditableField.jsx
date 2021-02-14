import React, { useState } from 'react'
import { TouchableWithoutFeedback, TextInput, StyleSheet, Text } from 'react-native'

export const EditableField = ({ style, placeholder, value, setValue }) => {
    const [height, setHeight] = useState(0);

    const onChange = (e) => {
        setHeight(e.nativeEvent.contentSize.height)
    }

    return (
        <>
            <Text style={styles.label}>{placeholder}:</Text>
            <TextInput
                autoCorrect={false}
                multiline
                autoCapitalize={'sentences'}
                placeholder={placeholder}
                style={{
                    ...styles.textInput,
                    ...style,
                    height
                }}
                value={value}
                onContentSizeChange={onChange}
                onChangeText={setValue} />
        </>
    )
}


const styles = StyleSheet.create({
    textInput: {
        fontSize: 18,
        padding: 3,
        minHeight: 30,
        color: '#292F36',
        maxWidth: '100%'
    },
    label: {
        marginLeft: 10,
        color: '#4ECDC4',
        fontStyle: 'italic'
    }
})