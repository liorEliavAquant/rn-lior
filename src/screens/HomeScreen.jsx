
import React, {useEffect} from 'react'
import { Text, View, StyleSheet, DevSettings, AppState } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useBlogsContext } from '../blogs.context';
import { PostsList } from '../components/PostsList';

const HomeScreen = ({navigation}) => {

    useEffect(() => {
        AppState.addEventListener('change', console.log)
        // console.log('AppState.currentState', AppState.currentState);
    }, [])
    return (
        <View style={styles.main}>
            <Text style={styles.heading}>
                Blogs Home 🖌
            </Text>
            <PostsList />
            <TouchableOpacity onPress={() => navigation.navigate('edit')}>
                <View style={styles.createPostButton}>
                    <Text style={styles.buttonText}>
                        Create new post!
                    </Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    main: {
        ...StyleSheet.absoluteFill,
        display: 'flex',
    },
    heading: {
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#292F36',
        marginTop: 50
    },
    createPostButton: {
        paddingVertical: 8,
        marginHorizontal: 40,
        borderColor: '#292F36',
        borderWidth: 2,
        borderRadius: 9,
        marginVertical: 25
    },
    buttonText: {
        color: '#292F36',
        fontSize: 17,
        textAlign: 'center'

    }
})

export default HomeScreen;