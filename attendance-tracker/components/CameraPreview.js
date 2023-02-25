import { View, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';


export default function CameraPreview({ photo, sendPicture, retakePicture }) {
  console.log('sdsfds', photo)
  return (
    <View
      style={{
        backgroundColor: 'transparent',
        flex: 1,
        width: '100%',
        height: '100%'
      }}
    >
      <ImageBackground
        source={{ uri: photo && photo.uri }}
        style={{
          flex: 1
        }}
      >

        <View style={styles.toggleCameraContainer}>
        <View style={styles.icons}>
          <TouchableOpacity onPress={retakePicture} >
            <Ionicons name="refresh" size={50} color="orange" />
          </TouchableOpacity>
        </View>
        <View style={styles.icons}>
          <TouchableOpacity onPress={sendPicture} >
            <Ionicons name="arrow-forward" size={50} color="orange" />
          </TouchableOpacity>
        </View>
        
        </View>


      </ImageBackground>
    </View>

  )
}

const styles = StyleSheet.create({


  toggleCameraContainer: {
    flex: 1,
    paddingTop: 30,
    paddingRight: 25,
    justifyContent: 'flex-start',
    alignItems: 'flex-end',


  },
  icons: {
    margin: 5
  }
})
