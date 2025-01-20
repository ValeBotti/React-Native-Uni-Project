import { View, Text, StyleSheet } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';

export default function Splash() {

    return (
        <View style={styles.container}>
            <Icon name="reload-outline" size={50} color="#bac7af" style={styles.icon} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loading: {
        backgroundColor: '#fff',
        fontSize: 48,
        textAlign: 'center',
        width: '100%',
        paddingBottom: 20,
        marginTop: 20,
    }
});
