import { View, Text, Pressable, StyleSheet, TouchableOpacity } from 'react-native'
import { Camera, CameraType } from 'expo-camera';
import { useState, useEffect, useRef } from 'react';
import { useWindowDimensions } from 'react-native';
import { useIsFocused } from '@react-navigation/core';
import axios from 'axios';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CameraPreview from './CameraPreview';

export default function FacialRecognitionCamera({ navigation }) {

    const isFocused = useIsFocused();
    const [photo, setPhoto] = useState();
    const [previewVisible, setPreviewVisible] = useState(false)
    const [processing, setProcessing] = useState(false);
    let cameraRef = useRef();
    console.log(isFocused)
    const skander = useWindowDimensions()
    const [type, setType] = useState(CameraType.front);
    const [permission, requestPermission] = Camera.useCameraPermissions();

    useEffect(() => {
        if (!permission?.granted) {
            requestPermission();
        }
    }, []);

    
    const takePic = async () => {
        let options = {
            quality: 1,
            base64: true,
            exif: false
        };

        let newPhoto = await cameraRef.current.takePictureAsync(options)
        setPhoto(newPhoto);
        setPreviewVisible(true)
    };

    const __sendPicture = async () => {
        if (photo) {
            try {
                const response = await axios.post('http://192.168.1.23:5000/identify', {
                    image: {
                        dataURL: "data:image/jpeg;base64," + photo.base64
                    },
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                setProcessing(true)
                console.log(response.data.data)
                setProcessing(false)

            } catch (error) {
                console.log(error);
            }
        }
    };

    function toggleCameraType() {
        setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
    }

    const __retakePicture = () => {
        setPhoto(null)
        setPreviewVisible(false)
        
      }

    if (!permission?.granted) {
        return <Text>No camera permissions</Text>;
    }

    return (
        <>
            <View style={styles.container}>
                {previewVisible && photo ? 
                (
                    <CameraPreview 
                    photo={photo} 
                    sendPicture={__sendPicture}
                    retakePicture={__retakePicture} />

                ) : 

                    

                    isFocused &&

                    <Camera
                        style={styles.camera}
                        type={type}
                        zoom={0}
                        ref={cameraRef}


                    >
                        <View style={styles.toggleCameraContainer}>
                            <TouchableOpacity onPress={toggleCameraType}>
                                <Ionicons name="camera-reverse-outline" size={50} color="orange" />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.captureButton}>
                            <TouchableOpacity style={styles.snapAndsubmit} onPress={takePic}>
                                <Ionicons name="ellipse-outline" size={100} color="orange" />
                            </TouchableOpacity>
                        </View>
                    </Camera>

                }

                {console.log(skander)}
                {console.log(permission)}


            </View>

        </>
    )
}

const styles = StyleSheet.create({
    snapAndsubmit: {

        backgroundColor: 'transparent',


        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        // borderWidth: 2,
        borderColor: 'orange',

    },

    container: {
        width: '100%',
        height: '100%',
        padding: 0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'grey',
        borderRadius: 20


    },

    camera: {

        width: '100%',
        height: '100%',
    },

    captureButton: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginBottom: 65
    },

    toggleCameraContainer: {
        flex: 1,
        paddingTop: 45,
        paddingRight: 35,
        justifyContent: 'flex-start',
        alignItems: 'flex-end'

    },

    text: {
        fontSize: 15,
        alignSelf: 'center',
        color: 'orange',
        fontWeight: '700'
    }
})