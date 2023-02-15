import { View, Text, Image, ImageBackground, StyleSheet } from "react-native";

export default function Header() {
    return(
        <View style={styles.container}>
            <Text style={styles.text}>Hello</Text></View>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:'#fdd297',
        alignItems:'center',
        height:60,
        justifyContent:'center',
        fontFamily:''

    },
    text:{
        fontSize:20,
        fontWeight:'bold',

    }

})