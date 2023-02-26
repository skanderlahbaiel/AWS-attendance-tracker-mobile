import { View, Text, Pressable, StyleSheet, ImageBackground } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function ErrorScreen({ retakePicture, text }) {
    return (
        <ImageBackground
            source={require("attendance-tracker/assets/Success-background.png")}
            style={styles.background}
            imageStyle=
            {{ opacity: 0.4 }}
        >
            <View style={styles.container}>

                <Pressable style={styles.closeButton} onPress={() => {
                    retakePicture()

                }}>
                    <Ionicons name="close" size={50} color="#555555" />
                </Pressable>
                <View style={styles.textContainer}>
                    <Text style={styles.errorMessage}>{text}</Text>
                </View>

            </View>
        </ImageBackground>)
}

const styles = StyleSheet.create(
    {

        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },

        text: {
            fontSize: 24,
            lineHeight: 36,
            fontFamily: 'Helvetica',
            textAlign: 'center',
            margin: 30,
            justifyContent: 'center',
            alignItems: 'center',
            color: '#333333'

        },
        welcome: {
            fontWeight: '800',
            fontSize: 28,
            color: '#555555'
        },
        name: {
            marginTop: 10,
            marginBottom: 20,
            fontWeight: '800',
            color: '#555555'
        },
        closeButton: {
            position: 'absolute',
            top: 40,
            right: 20,
            zIndex: 1
        },
        closeContainer: {
            justifyContent: 'flex-start',
            alignItems: 'flex-end',
            marginBottom: 20
        },
       
        background: {
            flex: 1,
            justifyContent: "center",
            width: '100%'
        },

        textContainer: {
            backgroundColor: 'rgba(224, 224, 224, 0.3)',
            borderRadius: 10,
            paddingHorizontal: 20,
            paddingVertical: 10,
            marginTop: 20,
            alignSelf: 'center',
        },
        errorMessage: {
            color: '#757575',
            fontSize: 18,
            fontWeight: 'bold',
            textAlign: 'center',
        },







    }
)