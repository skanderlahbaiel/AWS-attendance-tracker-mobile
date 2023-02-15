import { View, Text, Pressable, StyleSheet } from 'react-native'
import Header from './Header'
import { Camera, CameraType } from 'expo-camera';
import { useState, useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import { useWindowDimensions } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

export default function FacialRecognitionCamera({ navigation }) {
    const skander = useWindowDimensions()
    const [type, setType] = useState(CameraType.back);
    const [permission, requestPermission] = Camera.useCameraPermissions();
    useEffect(() => {
        if (!permission?.granted) {
            requestPermission();
        }
    }, []);

    useFocusEffect(() => {
        const onFocus = () => {
            if (!permission?.granted) {
                requestPermission();
            }
        };
        navigation.addListener('focus', onFocus);
        return () => {
            navigation.removeListener('focus', onFocus);
        };
    });

    function toggleCameraType() {
        setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
    }
    if (!permission?.granted) {
        return <Text>No camera permissions</Text>;
    }
    return (
        <View style={styles.container}>





            <Camera
                style={styles.camera}
                type={type} zoom={0}
                focusDepth={0.5}
                
            >
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
                        <Text style={styles.text}>Flip Camera</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.pressableContainer}>
                <Pressable onPress={() => navigation.navigate('ReportScreen')}>
                    <View>
                        <Text>Attendance</Text>
                        
                        
                    </View>

                </Pressable>
            </View>
            </Camera>

            {console.log(skander)}
            {console.log(permission)}

            
        </View>
    )
}

const styles = StyleSheet.create({
    pressableContainer: {

        backgroundColor: '#fdd279',
        height: 40,
        width: 130,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#fff8eb',
        margin:8
    },
    container: {
        flex: 1,
        padding: 25,
        alignItems: 'center',
        justifyContent: 'center'
    },
   
    camera: {
       width:411.42857142857144,
       height: 797

    },
    buttonContainer: {
        height: 100,
        width: 100
    },
    button: {
        height: 100,
        width: 100
    },
    text: {
        fontSize: 17,
        alignSelf:'center',
        margin:10,
        color:'red'
    }
})