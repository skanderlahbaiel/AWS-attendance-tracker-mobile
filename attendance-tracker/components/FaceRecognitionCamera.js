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
    const [yourName, setYourName] = useState(null)
    const [distance, setDistance] = useState(null)
    const [error, setError] = useState(false)
    const [db, setDb] = useState(false)
    const [flashMode, setFlashMode] = useState('off')
    const [photo, setPhoto] = useState();
    const [name, setName] = useState();
    const [previewVisible, setPreviewVisible] = useState(false)
    const [processing, setProcessing] = useState(false);
    let cameraRef = useRef();
    const [type, setType] = useState(CameraType.front);
    const [permission, requestPermission] = Camera.useCameraPermissions();
    const [message, setMessage] = useState('');

    const showMessage = (text, duration = 100000) => {
        setMessage(text);
        setTimeout(() => setMessage(''), duration);
    };

    useEffect(() => {
        if (!permission?.granted) {
            requestPermission();
        }
    }, []);

    const __handleFlashMode = () => {
        if (flashMode === 'on') {
            setFlashMode('off')
        } else if (flashMode === 'off') {
            setFlashMode('on')
        } else {
            setFlashMode('auto')
        }

    }

    function showTextInput() {
        setDb(!db)
    }

    function updateName(addname) {
        setYourName(addname)
    }

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
                setProcessing(true)
                const response = await axios.post('http://192.168.1.23:5000/identify', {
                    image: {
                        dataURL: "data:image/jpeg;base64," + photo.base64
                    },
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });


                setName(response.data.name)
                setDistance(response.data.distance)
                setProcessing(false)

            } catch (error) {
                setError(true)
                setProcessing(false)
                console.log(error);
            }
        }
    };

    const __sendPicture_todb = async (yourName) => {
        if (!photo) {
            console.log("Photo is null or undefined");
            return;
        }

        else if (photo) {
            try {
                setProcessing(true)
                const response = await axios.post('http://192.168.1.23:5000/addface', {
                    image: {
                        dataURL: "data:image/jpeg;base64," + photo.base64,
                        name: yourName
                    },
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });


                console.log(response.data)
                setProcessing(false)
                setYourName(null)
                setDb(false)
                setPhoto(null)
                setPreviewVisible(false)
                showMessage(response.data.msg)



            } catch (error) {
                setError(true)
                setProcessing(false)
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
        setName(null)
        setError(false)

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
                            retakePicture={__retakePicture}
                            processing={processing}
                            name={name}
                            __sendPicture_todb={__sendPicture_todb}
                            db={db}
                            showTextInput={showTextInput}
                            yourName={yourName}
                            updateName={updateName}
                            distance={distance}
                            error={error}


                        />

                    ) :



                    isFocused &&

                    <Camera
                        style={styles.camera}
                        type={type}
                        zoom={0}
                        ref={cameraRef}
                        ratio="16:9"
                        flashMode={flashMode}


                    >
                        <View style={styles.toggleCameraContainer}>
                            <TouchableOpacity style = {styles.touchOPacity} onPress={toggleCameraType}>
                                <Ionicons name="camera-reverse-outline" size={35} color="#E0E0E0" />
                            </TouchableOpacity >
                            <TouchableOpacity style = {styles.touchOPacity} onPress={__handleFlashMode}>
                                <Ionicons name={flashMode == "off" ? "flash" : "flash-off"} size={35} color="#E0E0E0" />
                            </TouchableOpacity>
                        </View>
                        {message &&
                            <View style={styles.message_success_add}>
                                <Text style={{ color: 'green' }}>{message}</Text>
                            </View>
                        }

                        <View style={styles.captureButton}>
                            <TouchableOpacity style={styles.snapAndsubmit} onPress={takePic}>
                                <Ionicons name="ellipse" size={100} color="#E0E0E0" />
                            </TouchableOpacity>
                        </View>


                    </Camera>

                }


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
    touchOPacity: {
        paddingBottom:10,
        paddingTop:10
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
        alignItems: 'flex-end',

    },

    text: {
        fontSize: 15,
        alignSelf: 'center',
        color: 'orange',
        fontWeight: '700'
    },
    message_success_add: {
        alignContent: 'center',
        justifyContent: 'center',
        paddingBottom: 60,
        alignSelf: 'center'
    }
})