import { View, Text, ActivityIndicator, ImageBackground, StyleSheet} from "react-native";

export default function ProcessingScreen() {
    return (
       
            <ImageBackground
             source={require("attendance-tracker/assets/orange-background.png")}
             style={styles.background}
             imageStyle=
                {{ opacity: 0.4 }}
             >
            <ActivityIndicator size="large" color="white" />
</ImageBackground>
        
    )
}


const styles = StyleSheet.create( {
    background: {
        flex: 1,
        justifyContent: "center",
        width:'100%'
    }
}
)